import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject, throwError, timer } from 'rxjs';
import { catchError, first, flatMap, map, switchMap } from 'rxjs/operators';

import { AuthTokenService } from './auth-token.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	private tokenRefreshIsInProgress = false;
	private tokenRefreshedSource: Subject<any> = new Subject();
	private tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

	constructor(private authService: AuthService, private authTokenService: AuthTokenService, private router: Router) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// For requests which are not to our own API, avoid adding the authorization header or refresh token handling.
		if (!request.url.startsWith(environment.apiBaseUrl)) {
			return next.handle(request);
		}

		request = this.addAuthHeader(request);

		return next.handle(request)
			.pipe(
				// The request has failed
				catchError((error) => {
					console.error('Auth interceptor error', error);
					if (error.status === 401) {
						console.debug('Attempting to refresh the authToken for an unauthenticated user');

						return this.refreshToken()
							.pipe(
								switchMap(() => {
									console.debug('We successfully renewed the authToken. Try the request again');

									request = this.addAuthHeader(request);
									return next.handle(request);
								}),
								catchError(() => {
									console.debug('OUTER - The authToken could not be refreshed; The user will have to provide their credentials again');

									this.logoutLocally();
									return EMPTY;
								})
							)
					}
					console.debug('The error was uncaught');
					// The error response cannot be fixed by refresh tokens; let it pass through.
					return throwError(error);
				})
			);
	}

	private addAuthHeader(request): HttpRequest<any> {
		// If the JWT is available, add it to the authorization header
		const authToken = this.authTokenService.authToken;
		if (authToken) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${authToken}`
				}
			});
			console.debug('Authorization header was added to request', request);
		}
		else {
			console.debug('Authorization header WAS NOT added to request', request);
		}

		return request;
	}

	private logoutLocally(): void {
		// Removing authentication locally since we're already logged out of the remote at this point.
		console.log('Logging out locally; received an HTTP 401 on token refresh attempt.');
		this.authTokenService.clearAuthToken();
		this.router.navigate(['/login']);
	}

	public refreshToken(): Observable<any> {
		if (this.tokenRefreshIsInProgress) {
			return timer(2000); // FIXME DJC Determine how to appropriately signal via a mutex to prevent non-reentracy
		} else {
			this.tokenRefreshIsInProgress = true;

			return this.authService.refreshToken()
				.pipe(
					map(() => {
						this.tokenRefreshIsInProgress = false;
						this.tokenRefreshedSource.next();
					}),
					catchError(() => {
						console.debug('INNER - The authToken could not be refreshed; The user will have to provide their credentials again');

						this.logoutLocally();
						return EMPTY;
					})
				);
		}
	}
}

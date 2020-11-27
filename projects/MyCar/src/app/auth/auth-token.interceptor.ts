import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject, throwError } from 'rxjs';
import { catchError, flatMap, map, switchMap, tap } from 'rxjs/operators';

import { AuthTokenService } from './auth-token.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { delayUntil } from './auth.operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	private tokenRefreshIsInProgress = false;
	private tokenRefreshed$: Subject<any> = new Subject();

	constructor(private authService: AuthService, private authTokenService: AuthTokenService, private router: Router) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// For requests which are not to our own API, avoid adding the authorization header or refresh token handling.
		if (!request.url.startsWith(environment.apiBaseUrl)) {
			return next.handle(request);
		}

		console.log('Request intercepted for URL', request.url);

		request = this.addAuthHeader(request);

		return next.handle(request)
			.pipe(
				// The request has failed
				catchError((error) => {
					console.log('HTTP request interceptor caught the following error', error);
					if (error.status === 401) {
						console.log('HTTP 401 detected - Attempting to refresh the authToken for an unauthenticated user');

						if (request.url.indexOf('auth/renew') >= 0) {
							console.log('Cannot refresh a failure to renew the refresh token. Logging out locally...');
							this.logoutLocally();
							return EMPTY;
						}

						if (request.url.indexOf('auth/logon') >= 0) {
							console.log('Cannot refresh a failure log in. Rethrowing...');

							return throwError(error);
						}

						return this.refreshToken()
							.pipe(
								flatMap(() => {
									console.log('Auth token renewed! Request will be retried...');

									request = this.addAuthHeader(request);
									return next.handle(request);
								}),
								catchError(() => {
									console.log('OUTER - The authToken could not be refreshed; The user will have to provide their credentials again');

									this.logoutLocally();
									return EMPTY;
								})
							);
					}
					console.log('A non-refreshable HTTP error was caught. Letting it pass.');
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
			console.log('Authorization header was added to request', request);

		} else {
			console.log('Authorization header WAS NOT added to request', request);
		}

		return request;
	}

	private logoutLocally(): void {
		// Removing authentication locally since we're already logged out of the remote at this point.
		console.log('Logging out locally; received an HTTP 401 on token refresh attempt.');
		this.authTokenService.clearAuthToken();
		this.authTokenService.clearRefreshToken();
		this.router.navigate(['/login']);
	}

	public refreshToken(): Observable<any> {
		if (this.tokenRefreshIsInProgress) {
			return new Observable()
				.pipe(
					tap(() => console.log('Token refresh in progress. Request retry is awaiting tokenRefresh$')),
					delayUntil(this.tokenRefreshed$),
					tap(() => console.log('tokenFrefresh$ has signalled. Unblocking caller...'))
				);
		} else {
			this.tokenRefreshIsInProgress = true;

			return this.authService.refreshToken()
				.pipe(
					map(() => {
						console.log('Token refreshed. Signalling other callers to continue.');
						this.tokenRefreshIsInProgress = false;
						this.tokenRefreshed$.next();
						this.tokenRefreshed$.complete();
						// TODO: DJC Determine if with different refresh token timeout, re-assignment of this is necessary
						// this.tokenRefreshed$ = new Subject<any>();
					}),
					catchError(() => {
						console.log('INNER - The authToken could not be refreshed; The user will have to provide their credentials again');

						this.logoutLocally();
						return EMPTY;
					})
				);
		}
	}
}

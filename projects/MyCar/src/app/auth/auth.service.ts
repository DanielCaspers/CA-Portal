import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient, private authTokenService: AuthTokenService) { }

	public login(username: string, password: string): Observable<boolean> {
		// NOTE: Using FormData so Angular tacks on the x-www-form-urlencoded header
		// due the the difficulty of adding headers on additional to those in the http options.
		const formData = new FormData();
		formData.set('username', username);
		formData.set('password', password);

		return this.http.post<{authToken: string, refreshToken: string}>
		(`${environment.apiBaseUrl}/auth/logon`, formData, environment.httpOptions)
			.pipe(
				map((result) => {
					this.authTokenService.authToken = result.authToken;
					this.authTokenService.refreshToken = result.refreshToken;
					return true;
				})
			);
	}

	public logout(): Observable<boolean> {
		return this.http.get(`${environment.apiBaseUrl}/auth/logoff`, {...environment.httpOptions, responseType: 'text' })
			.pipe(
				map(() => {
					this.authTokenService.clearAuthToken();
					this.authTokenService.clearRefreshToken();
					return true;
				})
			);
	}

	public accessToken(accessCode: string): Observable<boolean> {
		const httpOptions = environment.httpOptions;
		httpOptions.headers.append('Content-Type', 'x-www-form-urlencoded');

		return this.http.get<{authToken: string, refreshToken: string}>
		(`${environment.apiBaseUrl}/auth/token?access_code=${accessCode}`, environment.httpOptions)
			.pipe(
				map((result) => {
					this.authTokenService.authToken = result.authToken;
					this.authTokenService.refreshToken = result.refreshToken;
					return true;
				})
			);
	}

	public refreshToken(): Observable<boolean> {
		return this.http.get<{authToken: string, refreshToken: string}>
		(`${environment.apiBaseUrl}/auth/renew?refreshToken=${this.authTokenService.refreshToken}`, environment.httpOptions)
			.pipe(
				map((result) => {
					this.authTokenService.authToken = result.authToken;
					return true;
				})
			);
	}
}

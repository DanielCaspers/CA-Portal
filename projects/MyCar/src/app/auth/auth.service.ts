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

		return this.http.post<{authToken: string}>(`${environment.apiBaseUrl}/auth/logon`, formData, environment.httpOptions)
			.pipe(
				map(result => {
					console.log('Angular got', result);

					this.authTokenService.authToken = (result as any).authToken;
					return true;
				})
			);
	}

	public logout(): Observable<boolean> {
		return this.http.get<any>(`${environment.apiBaseUrl}/auth/logoff`, environment.httpOptions)
			.pipe(
				map(result => {
					console.log('Angular got', result);
					this.authTokenService.clear();
					return true;
				})
			);
	}
}

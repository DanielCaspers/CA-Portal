import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot
} from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private http: HttpClient,
		private router: Router,
		private jwtHelperService: JwtHelperService,
		private authTokenService: AuthTokenService
	) { }

	public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.authCheck(next, state);
	}

	public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.authCheck(next, state);
	}

	private authCheck(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const token = this.authTokenService.authToken;
		const isTokenExpired = this.jwtHelperService.isTokenExpired(token);

		// A non-expired token exists; allow the navigation
		if (!!token && !isTokenExpired) {
			return true;
		}
		// An expired token exists; force the HTTP interceptor to deal with it, and disallow the navigation until it makes the decision
		else if (!!token && isTokenExpired) {
			// TODO DJC Intentionally forcing the HTTP interceptor to kick in and throwing away this request.
			// this.http.get(`${environment.apiBaseUrl}/orders/`, environment.httpOptions);

			// TODO DJC Temporarily return true in order to wait until it is broken by the HTTP interceptor
			return true;
		}
		// There is no token; the user must log in
		else {
			this.router.navigate(['login']);
			return false;
		}
	}
}

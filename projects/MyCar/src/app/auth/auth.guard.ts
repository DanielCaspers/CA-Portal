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

		} else if (!!token && isTokenExpired) {
			// An expired token exists; let the HTTP interceptor to deal with it.
			// We allow routing in the meantime as otherwise on returning to the app, the user could be greeted with a blank screen
			// if they are re-activating root routes
			return true;

		} else {
			// There is no token; the user must log in
			console.log('No token directed, redirecting to login...');
			this.router.navigate(['login']);
			return false;
		}
	}
}

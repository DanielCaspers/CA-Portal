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

		if (!!token && !this.jwtHelperService.isTokenExpired(token)) {
			return true;
		}

		this.router.navigate(['login']);
		return false;
	}
}

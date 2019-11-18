import { Injectable } from '@angular/core';

@Injectable()
export class AuthTokenService {
	private authTokenStorageKey = 'access_token';
	private refreshTokenStorageKey = 'refresh_token';

	constructor() { }

	public set authToken(token: string) {
		localStorage.setItem(this.authTokenStorageKey, token);
	}

	public get authToken(): string {
		return localStorage.getItem(this.authTokenStorageKey);
	}

	public clearAuthToken(): void {
		localStorage.removeItem(this.authTokenStorageKey);
	}

	public set refreshToken(token: string) {
		localStorage.setItem(this.refreshTokenStorageKey, token);
	}

	public get refreshToken(): string {
		return localStorage.getItem(this.refreshTokenStorageKey);
	}

	public clearRefreshToken(): void {
		localStorage.removeItem(this.refreshTokenStorageKey);
	}
}

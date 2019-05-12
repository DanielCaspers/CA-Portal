import { Injectable } from '@angular/core';

@Injectable()
export class AuthTokenService {
	private storageKey = 'access_token';

	constructor() { }

	public set authToken(token: string) {
		localStorage.setItem(this.storageKey, token);
	}

	public get authToken(): string {
		return localStorage.getItem(this.storageKey);
	}

	public clear(): void {
		localStorage.removeItem(this.storageKey);
	}
}

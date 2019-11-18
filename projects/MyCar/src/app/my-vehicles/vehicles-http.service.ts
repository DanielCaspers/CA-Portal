import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthTokenService } from '../auth/auth-token.service';

@Injectable()
export class VehiclesHttpService {

	constructor(
		private authTokenService: AuthTokenService,
		private httpClient: HttpClient,
		private jwtHelperService: JwtHelperService) {
	}

	public getVehiclesForClient(): Observable<any> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		return this.httpClient.get(
			`${environment.apiBaseUrl}/${token.conos[ 0 ]}/vehicles/client/${token.fID}`,
			environment.httpOptions);
		// Temporarily using this endpoint as it should not fail when unauthorized
		// return this.httpClient.get(
		// 	`${environment.apiBaseUrl}/004/orders/004568597`,
		// 	environment.httpOptions);
	}
}

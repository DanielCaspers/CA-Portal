import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { sortBy } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

		return this.httpClient.get<any>(
			`${environment.apiBaseUrl}/${token.conos[0]}/vehicles/client/${token.conos[0]}${token.clientIDs[0]}`,
			environment.httpOptions).pipe(
				map(vehiclesDto => {
					for (let v of vehiclesDto) {
						if (v.vehicleRS != null) {
							v.recommendedServices = v.vehicleRS.map(rs => {
								return {
									Id: rs.id,
									Description: rs.desc,
									OrderId: rs.orderId,
									LastModifiedDate: new Date(rs.date),
									TechnicianId: rs.techNum,
									AppLink: rs.DIlink,
									EstimateId: rs.estID,
									NotificationCount: rs.notificationCnt,
									Severity: parseInt(rs.level), // TODO DJC You really need to discuss this with Dad. Not cool....
									CompanyNumber: rs.coNumber
								};
							});

							v.recommendedServices = sortBy(v.recommendedServices, 'Severity').reverse();
							v.aggregateSeverity = v.recommendedServices[0].Severity;
						}
						 else {
						 	v.recommendedServices = [];
						 	v.aggregateSeverity = 10;
						}

						 delete v.vehicleRS;
					}

					return vehiclesDto;
				})
		);
		// Temporarily using this endpoint as it should not fail when unauthorized
		// return this.httpClient.get(
		// 	`${environment.apiBaseUrl}/004/orders/004568597`,
		// 	environment.httpOptions);
	}
}

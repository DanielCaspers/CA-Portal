import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { sortBy } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
	RecommendedService
} from 'murphy-automotive-shared-library';

import { environment } from '../../environments/environment';
import { AuthTokenService } from '../auth/auth-token.service';
import { VehicleOverview } from './vehicle.models';

@Injectable()
export class VehiclesHttpService {

	constructor(
		private authTokenService: AuthTokenService,
		private httpClient: HttpClient,
		private jwtHelperService: JwtHelperService) {
	}

	public getVehiclesForClient(): Observable<VehicleOverview[]> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		return this.httpClient.get<any>(
			`${environment.apiBaseUrl}/${token.conos[0]}/vehicles/client/${token.conos[0]}${token.clientIDs[0]}`,
			environment.httpOptions)
			.pipe(
				map(vehiclesDto => {
					for (const v of vehiclesDto) {
						if (v.vehicleRS != null) {
							v.recommendedServices = v.vehicleRS.map(rs => {
								return {
									Id: rs.id,
									Description: rs.desc,
									OrderId: rs.orderID,
									LastModifiedDate: new Date(rs.date * 1000),
									TechnicianId: rs.techNum,
									AppLink: rs.DIlink,
									EstimateId: rs.estID,
									NotificationCount: rs.notificationCnt,
									Severity: parseInt(rs.level, 10),
									CompanyNumber: rs.coNumber
								} as RecommendedService;
							});

							v.recommendedServices = sortBy(v.recommendedServices, 'Severity', 'LastDateModified');
							v.aggregateSeverity = v.recommendedServices[0].Severity;

						} else {
							v.recommendedServices = [];
							v.aggregateSeverity = 10;
						}

						delete v.vehicleRS;

						// Only set this data if null/non-negative
						const dataIsNonNegativeAndNonNull = !!v.vehicleMaintDetails &&
							v.vehicleMaintDetails.length > 0 &&
							Math.sign(v.vehicleMaintDetails[0].lofLastOdometer) === 1 &&
							Math.sign(v.vehicleMaintDetails[0].lofLastDate) === 1 &&
							Math.sign(v.vehicleMaintDetails[0].lofIntervalDays) === 1 &&
							Math.sign(v.vehicleMaintDetails[0].lofIntervalMiles) === 1;

						if (dataIsNonNegativeAndNonNull) {
							v.nextOilChangeDate = new Date(
								(v.vehicleMaintDetails[0].lofLastDate * 1000) +
								v.vehicleMaintDetails[0].lofIntervalDays);

							v.nextOilChangeOdometer = v.vehicleMaintDetails[0].lofLastOdometer + v.vehicleMaintDetails[0].lofIntervalMiles;

							delete v.vehicleMaintDetails;
						}
					}

					return vehiclesDto as VehicleOverview[];
				})
		);
	}

	public deleteVehicleForClient(vehicleId: string): Observable<any> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		// return of({status: 204});
		return this.httpClient.delete(
			`${environment.apiBaseUrl}/${token.conos[0]}/vehicles/client/${token.conos[0]}${token.clientIDs[0]}/${vehicleId}`);
	}
}

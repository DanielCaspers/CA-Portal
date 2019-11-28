import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { sortBy } from 'lodash-es';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthTokenService } from '../auth/auth-token.service';
import { AppointmentScheduleResponse } from './appointment-scheduler.models';

@Injectable()
export class AppointmentSchedulerHttpService {

	constructor(
		private authTokenService: AuthTokenService,
		private httpClient: HttpClient,
		private jwtHelperService: JwtHelperService) {
	}

	public getAvaliableDates(): Observable<any> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		return this.httpClient.get<any>(`${environment.apiBaseUrl}/${token.conos[0]}/schedule`, environment.httpOptions).pipe(
				map(dto => {
					dto.daysAvailable = dto.daysAvailable.map(d => new Date(d * 1000).toISOString());
					return dto as AppointmentScheduleResponse;
				})
		);
	}
}

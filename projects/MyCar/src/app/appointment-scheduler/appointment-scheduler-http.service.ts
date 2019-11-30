import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthTokenService } from '../auth/auth-token.service';
import { AppointmentScheduleResponse } from './appointment-scheduler.models';
import { DynamicFormData } from './appointment-scheduler.component';

@Injectable()
export class AppointmentSchedulerHttpService {

	private static fuelEconomyApiMapper(dto): DynamicFormData[] {
		return dto.menuItem.map(item => {
			return {
				formValue: item.value,
				viewValue: item.text
			} as DynamicFormData
		});
	}

	private static fuelEconomyApiHttpOptions = { headers: new HttpHeaders({'Accept': 'application/json'}) };

	constructor(
		private authTokenService: AuthTokenService,
		private httpClient: HttpClient,
		private jwtHelperService: JwtHelperService) {
	}

	public getScheduleViewModel(): Observable<AppointmentScheduleResponse> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		return this.httpClient.get<any>(`${environment.apiBaseUrl}/${token.conos[0]}/schedule`, environment.httpOptions).pipe(
				map(dto => {
					dto.daysAvailable = dto.daysAvailable.map(d => new Date(d * 1000));

					const problemDescriptions = [];
					for (let p of dto.problemDescriptions) {
						for (let viewValue of p.Desc) {
							problemDescriptions.push({
								formValue: p.category,
								viewValue: viewValue
							} as DynamicFormData);
						}
					}
					dto.problemDescriptions = problemDescriptions;

					return dto as AppointmentScheduleResponse;
				})
		);
	}

	public getVehicleYears(): Observable<DynamicFormData[]> {
		return this.httpClient.get<any>(
			`https://www.fueleconomy.gov/ws/rest/vehicle/menu/year`,
			AppointmentSchedulerHttpService.fuelEconomyApiHttpOptions)
			.pipe(
				map(AppointmentSchedulerHttpService.fuelEconomyApiMapper)
			);
	}

	public getVehicleMakesByYear(year: string): Observable<DynamicFormData[]> {
		return this.httpClient.get<any>(
			`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${year}`,
			AppointmentSchedulerHttpService.fuelEconomyApiHttpOptions)
			.pipe(
				map(AppointmentSchedulerHttpService.fuelEconomyApiMapper)
			);
	}

	public getVehicleModelsByYearAndMake(year: string, make: string): Observable<DynamicFormData[]> {
		return this.httpClient.get<any>(
			`https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year}&make=${make}`,
			AppointmentSchedulerHttpService.fuelEconomyApiHttpOptions)
			.pipe(
				map(AppointmentSchedulerHttpService.fuelEconomyApiMapper)
			);
	}
}

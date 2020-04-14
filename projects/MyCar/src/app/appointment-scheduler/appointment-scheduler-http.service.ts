import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthTokenService } from '../auth/auth-token.service';
import { AppointmentScheduleResponse, AppointmentSchedulerRequest, AppointmentType } from './appointment-scheduler.models';
import { DynamicFormData } from './appointment-scheduler.component';

@Injectable()
export class AppointmentSchedulerHttpService {

	private static fuelEconomyApiHttpOptions = { headers: new HttpHeaders({'Accept': 'application/json'}) };

	private static fuelEconomyApiMapper(dto): DynamicFormData[] {
		return dto.menuItem.map(item => {
			return {
				formValue: item.value,
				viewValue: item.text
			} as DynamicFormData;
		});
	}

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
					for (const p of dto.problemDescriptions) {
						for (const viewValue of p.Desc) {
							problemDescriptions.push({
								formValue: p.category,
								viewValue: viewValue
							} as DynamicFormData);
						}
					}
					dto.problemDescriptions = problemDescriptions;

					// dto.reasonsToAvoidScheduling = ['Oil change', 'Tire rotation'];
					// dto.rentalCarBodyText = 'Rental cars are available for $30/day. Call for availability and to schedule.';
					// dto.daySelectionBodyText = 'Vehicles must be dropped off by 9am and left for the day.';
					// dto.daySelectionCaptionText = 'Open M-F 7am to 8pm, SAT: 8am - 5pm';

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

	public scheduleAppointment(request: AppointmentSchedulerRequest): Observable<any> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		const requestDto = this.appointmentMapper(request, token.clientIDs[0], token.conos[0]);

		return this.httpClient.post<any>(
			`${environment.apiBaseUrl}/${token.conos[0]}/orders`,
				requestDto,
				environment.httpOptions
			)
			.pipe(
				map(dto => {
					return dto;
				})
			);
	}

	private appointmentMapper(request: AppointmentSchedulerRequest, clientId: string, companyNumber: number): any {
		const dto = {
			cono: companyNumber,
			schedDate: request.ScheduleDate.getTime() / 1000, // D3-API expects *seconds* from epoch
			clientID: clientId,
			// preferredContacts: undefined, // Do not use for now according to Dad. NYI, YAGNI
			newVehicle: request.AppointmentType === AppointmentType.NewVehicle,
			vehicleID: request.vehicleID,
			vehicleYear: request.year,
			vehicleMake: request.make,
			vehicleModel: request.model,
			vehicleLicense: request.license,
			vehicleColor: request.color,
			vehicleEngine: request.engine,
			vehicleTransmission: request.transmission,
			workDesc: request.WorkDescription,
			sendConfirmation: true
		};

		return dto;
	}
}

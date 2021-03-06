import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthTokenService } from '../auth/auth-token.service';
import { VehicleHistoryEntry } from './vehicle-history.models';

@Injectable()
export class VehicleHistoryHttpService {

	constructor(
		private authTokenService: AuthTokenService,
		private httpClient: HttpClient,
		private jwtHelperService: JwtHelperService) {
	}

	public getVehicleHistoryByClient(numEntriesToLoad: number, startFromIndex: number): Observable<VehicleHistoryEntry[]> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		return this.httpClient.get<any>(
			`${environment.apiBaseUrl}/${token.conos[0]}/vehiclehist/client/${token.conos[0]}${token.clientIDs[0]}?$top=${numEntriesToLoad}&$skip=${startFromIndex}`,
			environment.httpOptions)
			.pipe(
				map(vehicleHistoryEntriesDto => {
					return this.vehicleHistoryMapper(vehicleHistoryEntriesDto);
				})
		);
	}

	public getVehicleHistoryByVIN(VIN: string, numEntriesToLoad: number, startFromIndex: number): Observable<VehicleHistoryEntry[]> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		return this.httpClient.get<any>(
			`${environment.apiBaseUrl}/${token.conos[0]}/vehiclehist/${VIN}?$top=${numEntriesToLoad}&$skip=${startFromIndex}`,
			environment.httpOptions)
			.pipe(
				map(vehicleHistoryEntriesDto => {
					return this.vehicleHistoryMapper(vehicleHistoryEntriesDto);
				})
		);
	}

	private vehicleHistoryMapper(vehicleHistoryEntriesDto: any[]): VehicleHistoryEntry[] {
		const vehicleHistoryEntries: VehicleHistoryEntry[] = vehicleHistoryEntriesDto.map(dto => {
			return {
				CompletionDate: new Date(dto.completionDate * 1000),
				PartsDescription: dto.partsDesc,
				Description: dto.laborDesc,
				OrderId: dto.orderID,
				Odometer: dto.vehicleOdometer,
				InvoiceLink: `${dto.invoiceLink}`,
				Year: dto.vehicleYear,
				Make: dto.vehicleMake,
				Model: dto.vehicleModel,
				Amount: dto.totalBill,
				BalanceDue: dto.balanceDue
			} as VehicleHistoryEntry;
		});

		return vehicleHistoryEntries;
	}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthTokenService } from '../auth/auth-token.service';
import { Coupon, CouponOfferType } from './coupon.models';

@Injectable()
export class CouponHttpService {

	private static couponMapper(couponDtos: any[]): Coupon[] {
		return couponDtos.map((dto) => {
			return {
				imgSrc: dto.cpnURL,
				offerType: CouponOfferType.General
			} as Coupon;
		});
	}

	constructor(
		private authTokenService: AuthTokenService,
		private httpClient: HttpClient,
		private jwtHelperService: JwtHelperService) {
	}

	public getCouponsForClient(): Observable<Coupon[]> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		return this.httpClient.get<any>(
			`${environment.apiBaseUrl}/${token.conos[0]}/promos/client/${token.clientIDs[0]}`,
			environment.httpOptions)
			.pipe(
				map(CouponHttpService.couponMapper)
			);
	}

	public getCouponsForVehicle(vehicleId: string): Observable<Coupon[]> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		return this.httpClient.get<any>(
			`${environment.apiBaseUrl}/${token.conos[0]}/promos/client/${token.clientIDs[0]}/vehicle/${vehicleId}`,
			environment.httpOptions)
			.pipe(
				map(CouponHttpService.couponMapper)
			);
	}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StoreInfo } from './store-info.models';
import { AuthTokenService } from '../auth/auth-token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class StoreInfoService {

	private storeInfoSubject: Subject<any> = new Subject();

	constructor(
		private authTokenService: AuthTokenService,
		private httpClient: HttpClient,
		private jwtHelperService: JwtHelperService) { }

	public getStoreInfo(): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.apiBaseUrl}/conos`,
			environment.httpOptions
			)
			.pipe(
				// Get Company Number From JWT
				map((dto) => {
					const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);
					const companyNumber = token.conos[0];
					return dto[companyNumber];
				}),
				// Map D3-API Model to Cleaner, Internal Model
				map((dto) => {
					return {
						CompanyNumber: dto.cono,
						EmailAddress: {
							DisplayValue: dto.emailAddress
						},
						PhoneNumberToCall: {
							ContactName: dto.conameShort,
							Number: dto.cophone,
							NumberForWebLink: dto.codial
						},
						PhoneNumberToSMS: {
							ContactName: dto.conameShort,
							Number: dto.cosms,
							NumberForWebLink: dto.cosms
						},
						StoreWebAssets: {
							LogoSmall: dto.logoSmall,
							WebAddress: dto.webaddr
						}
					} as StoreInfo;
				}),
				map(storeInfo => {
					storeInfo.PhoneNumberToCall.NumberForWebLink = 'tel:' + storeInfo.PhoneNumberToCall.NumberForWebLink;
					storeInfo.PhoneNumberToSMS.NumberForWebLink = 'sms:' + storeInfo.PhoneNumberToSMS.NumberForWebLink;
					storeInfo.EmailAddress.MailtoLink = 'mailto:' + storeInfo.EmailAddress.DisplayValue;
					return storeInfo;
				})
			);
	}
}

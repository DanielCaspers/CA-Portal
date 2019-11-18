import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { first, map } from 'rxjs/operators';

import { NavTitleService } from 'murphy-automotive-shared-library';

import { AuthService } from '../auth/auth.service';
import { AuthTokenService } from '../auth/auth-token.service';
import { StoreInfoService } from '../store-info/store-info.service';
import { StoreInfo } from '../store-info/store-info.models';

// import { StoreInfo, StoreInfoService } from '../store-info/store-info.module';

@Component({
	selector: 'ma-core-view',
	templateUrl: './core-view.component.html',
	styleUrls: [ './core-view.component.scss' ]
})
export class CoreViewComponent implements OnInit {

	// Defaulting to values until loaded for least disorienting experience
	// TODO DJC Make store-info sharable
	public storeInfo: StoreInfo = {
		PhoneNumberToCall: {
			NumberForWebLink: '+19524322454'
		},
		PhoneNumberToSMS: {
			NumberForWebLink: '+19524322454'
		},
		StoreWebAssets: {
			// LogoSmall: 'https://via.placeholder.com/109x69/b40000/b40000',
			LogoSmall: 'https://www.protech-automotive.com/_images/logos/004.png',
			WebAddress: 'https://www.protech-automotive.com/'
		}
	};

	public customerName = '';
	public primaryEmail = 'steve.caspers@murphyauto.net';
	public pointsBalance = 1234;
	public navTitle;

	constructor(
		private navTitleService: NavTitleService,
		private authService: AuthService,
		private authTokenService: AuthTokenService,
		private jwtHelperService: JwtHelperService,
		private storeInfoService: StoreInfoService,
		private router: Router) {
		this.navTitle = this.navTitleService.navTitle$;
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);
		this.customerName = token.firstName + ' ' + token.lastName;
	}

	public ngOnInit(): void {
		this.storeInfoService.getStoreInfo()
			.pipe(
				first(),
				map(storeInfo => {
					storeInfo.PhoneNumberToCall.NumberForWebLink = 'tel:' + storeInfo.PhoneNumberToCall.NumberForWebLink;
					storeInfo.PhoneNumberToSMS.NumberForWebLink = 'sms:' + storeInfo.PhoneNumberToSMS.NumberForWebLink;
					return storeInfo;
				})
			)
			.subscribe(storeInfo => {
				this.storeInfo = storeInfo;
			});
	}

	public logout(): void {
		this.authService.logout()
			.pipe(first())
			.subscribe(() => {
				this.router.navigate(['/login']);
			});
	}
}

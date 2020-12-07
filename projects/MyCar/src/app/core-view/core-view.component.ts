import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { first } from 'rxjs/operators';

import { NavTitleService } from 'murphy-automotive-shared-library';

import { AuthService } from '../auth/auth.service';
import { AuthTokenService } from '../auth/auth-token.service';
import { StoreInfoService } from '../store-info/store-info.service';
import { StoreInfo } from '../store-info/store-info.models';
import { AccountHttpService } from '../my-account/account-http.service';
import { AccountOverview } from '../my-account/account.models';
import { environment } from '../../environments/environment';

// import { StoreInfo, StoreInfoService } from '../store-info/store-info.module';

@Component({
	selector: 'ma-core-view',
	templateUrl: './core-view.component.html',
	styleUrls: [ './core-view.component.scss' ]
})
export class CoreViewComponent implements OnInit {

	// TODO DJC Make store-info sharable
	public storeInfo: StoreInfo;

	public account: AccountOverview;
	public customerName = '';
	public pointsBalance: number;
	public navTitle;

	private token;

	constructor(
		private accountHttpService: AccountHttpService,
		private authService: AuthService,
		private authTokenService: AuthTokenService,
		private jwtHelperService: JwtHelperService,
		private navTitleService: NavTitleService,
		private router: Router,
		private storeInfoService: StoreInfoService) {

		this.navTitle = this.navTitleService.navTitle$;

		this.token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);
		this.customerName = this.token.clientName;
	}

	public ngOnInit(): void {
		this.storeInfoService.getStoreInfo()
			.pipe(
				first()
			)
			.subscribe(storeInfo => {
				this.storeInfo = storeInfo;
			});

		this.accountHttpService.getAccount()
			.pipe(
				first()
			)
			.subscribe(account => {
				this.account = account;
				this.pointsBalance = account.loyaltyAccount.vipPointBalance;
			});
	}

	public logout(): void {
		this.authService.logout()
			.pipe(first())
			.subscribe(() => {
				window.location.href = environment.oauthProviderUrl;
			});
	}
}

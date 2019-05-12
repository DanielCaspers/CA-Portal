import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { NavTitleService } from 'murphy-automotive-shared-library';

import { AuthService } from '../auth/auth.service';

// import { StoreInfo, StoreInfoService } from '../store-info/store-info.module';

@Component({
	selector: 'ma-core-view',
	templateUrl: './core-view.component.html',
	styleUrls: [ './core-view.component.scss' ]
})
export class CoreViewComponent implements OnInit {

	// Defaulting to values until loaded for least disorienting experience
	// TODO DJC Make store-info sharable
	public storeInfo: any = {
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

	public customerName = 'Steve Caspers';
	public primaryEmail = 'steve.caspers@murphyauto.net';
	public pointsBalance = 1234;
	public navTitle;

	constructor(private navTitleService: NavTitleService, private authService: AuthService, private router: Router) {
		this.navTitle = this.navTitleService.navTitle$;
	}

	public ngOnInit(): void {
		// this.storeInfoSubscription = this.storeInfoService.storeInfo$
		// 	.pipe(
		// 		map(storeInfo => {
		// 			storeInfo.PhoneNumberToCall.NumberForWebLink = 'tel:' + storeInfo.PhoneNumberToCall.NumberForWebLink;
		// 			storeInfo.PhoneNumberToSMS.NumberForWebLink = 'sms:' + storeInfo.PhoneNumberToSMS.NumberForWebLink;
		// 			return storeInfo;
		// 		})
		// 	)
		// 	.subscribe(storeInfo => {
		// 		this.storeInfo = storeInfo;
		// 	});
	}

	public logout(): void {
		console.log('Logout button clicked');
		this.authService.logout()
			.pipe(first())
			.subscribe(() => {
			this.router.navigate(['/login']);
		});
	}
}

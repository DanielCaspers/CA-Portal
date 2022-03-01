import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreInfo, StoreInfoService } from '../../http/store-info/store-info.module';

@Component({
	selector: 'ma-core-view',
	templateUrl: './core-view.component.html',
	styleUrls: [ './core-view.component.scss' ]
})
export class CoreViewComponent implements OnInit, OnDestroy {

	// Defaulting to values until loaded for least disorienting experience
	public storeInfo: StoreInfo = {
		PhoneNumberToCall: {
			NumberForWebLink: '+19524322454'
		},
		PhoneNumberToSMS: {
			NumberForWebLink: '+19524322454'
		},
		StoreWebAssets: {
			LogoSmall: 'https://via.placeholder.com/109x69/b40000/b40000',
			// LogoSmall: 'https://www.protech-automotive.com/_images/logos/004.png',
			WebAddress: 'https://www.protech-automotive.com/'
		}
	};

	private storeInfoSubscription: Subscription;

	constructor(
		private storeInfoService: StoreInfoService
	) {
	}


	public ngOnInit(): void {
		this.storeInfoSubscription = this.storeInfoService.storeInfo$
			.pipe(
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

	public ngOnDestroy(): void {
		this.storeInfoSubscription.unsubscribe();
	}

}

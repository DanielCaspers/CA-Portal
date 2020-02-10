import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountHttpService } from '../account-http.service';
import { StoreInfoService } from '../../store-info/store-info.service';

@Component({
	selector: 'ma-vip-rewards',
	templateUrl: './vip-rewards.component.html',
	styleUrls: [ './vip-rewards.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VipRewardsComponent implements OnInit {

	public vipRewardsPoints: number;
	private companyNumber: string;

	constructor(private accountHttpService: AccountHttpService, private storeInfoService: StoreInfoService) { }

	public ngOnInit(): void {
		this.accountHttpService.getAccount()
			.pipe(
				first()
			)
			.subscribe((account) => {
				this.vipRewardsPoints = account.loyaltyAccount.vipPointBalance;
			});

		this.storeInfoService.getStoreInfo()
			.pipe(
				first()
			)
			.subscribe(storeInfo => {
				this.companyNumber = storeInfo.CompanyNumber;
			});
	}

	public get shouldShowReward(): boolean {
		return this.companyNumber !== '002';
	}
}

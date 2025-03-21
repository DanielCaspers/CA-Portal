import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountHttpService } from '../account-http.service';
import { VipRewardsHttpService } from './vip-rewards-http.service';
import { VipReward, VipRewardType } from './vip-rewards.models';

@Component({
	selector: 'ma-vip-rewards',
	templateUrl: './vip-rewards.component.html',
	styleUrls: [ './vip-rewards.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VipRewardsComponent implements OnInit {

	public vipRewardsPoints: number;
	public serviceRewards: VipReward[];
	public oilChangeRewards: VipReward[];

	constructor(private accountHttpService: AccountHttpService, private vipRewardsService: VipRewardsHttpService) { }

	public ngOnInit(): void {
		this.accountHttpService.getAccount()
			.pipe(
				first()
			)
			.subscribe((account) => {
				this.vipRewardsPoints = account.loyaltyAccount.vipPointBalance;
			});

		this.vipRewardsService.getVipRewards()
			.pipe(
				first()
			)
			.subscribe((vipRewards) => {
				const sortedVipRewards = vipRewards.sort((a, b) => a.points - b.points); // Numeric ascending by points
				this.serviceRewards = sortedVipRewards.filter(r => r.type === VipRewardType.Service);
				this.oilChangeRewards = sortedVipRewards.filter(r => r.type === VipRewardType.OilChange);
			});
	}
}

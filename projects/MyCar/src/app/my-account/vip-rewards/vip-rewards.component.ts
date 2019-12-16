import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';

import { AccountHttpService } from '../account-http.service';
import { first } from 'rxjs/operators';

@Component({
	selector: 'ma-vip-rewards',
	templateUrl: './vip-rewards.component.html',
	styleUrls: [ './vip-rewards.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VipRewardsComponent implements OnInit {

	public vipRewardsPoints: number;

	constructor(private accountHttpService: AccountHttpService) { }

	public ngOnInit(): void {
		this.accountHttpService.getAccount()
			.pipe(first())
			.subscribe((account) => {
				this.vipRewardsPoints = account.loyaltyAccount.vipPointBalance;
			});
	}
}

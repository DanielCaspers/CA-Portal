import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { VipRewardsRoutingModule } from './vip-rewards-routing.module';
import { VipRewardsComponent } from './vip-rewards.component';
import { VipRewardsHttpService } from './vip-rewards-http.service';

@NgModule({
	declarations: [ VipRewardsComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,

		MatCardModule,
		MatDividerModule,
		MatListModule,
		VipRewardsRoutingModule
	],
	entryComponents: [ VipRewardsComponent ],
	providers: [VipRewardsHttpService]
})
export class VipRewardsModule {
}

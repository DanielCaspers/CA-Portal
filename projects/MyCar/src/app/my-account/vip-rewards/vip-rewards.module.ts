import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	MatCardModule,
	MatDividerModule,
	MatListModule
} from '@angular/material';

import { VipRewardsRoutingModule } from './vip-rewards-routing.module';
import { VipRewardsComponent } from './vip-rewards.component';

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
	entryComponents: [ VipRewardsComponent ]
})
export class VipRewardsModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	MatButtonToggleModule,
	MatCardModule,
	MatIconModule,
	MatListModule
} from '@angular/material';

import { VipRewardsRoutingModule } from './vip-rewards-routing.module';
import { VipRewardsComponent } from './vip-rewards.component';

@NgModule({
	declarations: [ VipRewardsComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,

		MatButtonToggleModule,
		MatCardModule,
		MatListModule,
		MatIconModule,

		VipRewardsRoutingModule
	],
	entryComponents: [ VipRewardsComponent ]
})
export class VipRewardsModule {
}

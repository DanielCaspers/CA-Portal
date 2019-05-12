import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule, MatCardModule, MatIconModule, MatListModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGaugeModule } from 'ngx-gauge';

import { VipRewardsRoutingModule } from './vip-rewards-routing.module';
import { VipRewardsComponent } from './vip-rewards.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	declarations: [ VipRewardsComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,

		MatButtonToggleModule,
		MatCardModule,
		MatListModule,
		MatIconModule,

		NgxChartsModule,
		NgxGaugeModule,

		VipRewardsRoutingModule
	],
	entryComponents: [ VipRewardsComponent ]
})
export class VipRewardsModule {
}

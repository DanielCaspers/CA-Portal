import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomerVehicleSummaryComponent } from './customer-vehicle-summary.component';

@NgModule({
	declarations: [
		CustomerVehicleSummaryComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule
	],
	exports: [
		CustomerVehicleSummaryComponent
	]
})
export class CustomerVehicleSummaryModule {
}

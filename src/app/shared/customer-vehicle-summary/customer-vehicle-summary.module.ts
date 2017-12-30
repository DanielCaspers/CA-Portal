import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomerVehicleSummaryComponent } from './customer-vehicle-summary.component';

@NgModule({
	declarations: [
		CustomerVehicleSummaryComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		CustomerVehicleSummaryComponent
	]
})
export class CustomerVehicleSummaryModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VehicleColorIndicatorModule } from '../vehicle-color-indicator/vehicle-color-indicator.module';
import { CustomerVehicleSummaryComponent } from './customer-vehicle-summary.component';

@NgModule({
	declarations: [
		CustomerVehicleSummaryComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		VehicleColorIndicatorModule
	],
	exports: [
		CustomerVehicleSummaryComponent
	]
})
export class CustomerVehicleSummaryModule {
}

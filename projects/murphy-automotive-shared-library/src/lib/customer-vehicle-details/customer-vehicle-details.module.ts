import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { VehicleColorIndicatorModule } from '../vehicle-color-indicator/vehicle-color-indicator.module';

import { CustomerVehicleDetailsComponent } from './customer-vehicle-details.component';


@NgModule({
	declarations: [
		CustomerVehicleDetailsComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		MatCheckboxModule,
		VehicleColorIndicatorModule
	],
	exports: [
		CustomerVehicleDetailsComponent
	]
})
export class CustomerVehicleDetailsModule {
}

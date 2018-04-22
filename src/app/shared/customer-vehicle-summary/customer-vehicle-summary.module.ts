import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';

import { CustomerVehicleSummaryComponent } from './customer-vehicle-summary.component';

@NgModule({
	declarations: [
		CustomerVehicleSummaryComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		MatCheckboxModule
	],
	exports: [
		CustomerVehicleSummaryComponent
	]
})
export class CustomerVehicleSummaryModule {
}

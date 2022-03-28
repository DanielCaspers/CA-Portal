import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { VehicleColorIndicatorComponent } from './vehicle-color-indicator.component';


@NgModule({
	declarations: [
		VehicleColorIndicatorComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		MatCheckboxModule
	],
	exports: [
		VehicleColorIndicatorComponent
	]
})
export class VehicleColorIndicatorModule {
}

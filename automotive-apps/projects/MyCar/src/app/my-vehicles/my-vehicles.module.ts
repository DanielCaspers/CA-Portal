import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatMenuModule
} from '@angular/material';

import { MyVehiclesRoutingModule } from './my-vehicles-routing.module';
import { MyVehiclesComponent } from './my-vehicles.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { RecommendedServiceSeverityModule } from 'murphy-automotive-shared-library';

@NgModule({
	declarations: [ MyVehiclesComponent, VehicleCardComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,

		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatMenuModule,

		RecommendedServiceSeverityModule,

		MyVehiclesRoutingModule
	],
	entryComponents: [ MyVehiclesComponent ]
})
export class MyVehiclesModule {
}

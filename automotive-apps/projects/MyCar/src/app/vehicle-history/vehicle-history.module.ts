import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleHistoryRoutingModule } from './vehicle-history-routing.module';
import { VehicleHistoryComponent } from './vehicle-history.component';
import { VehicleHistoryTableComponent } from './vehicle-history-table/vehicle-history-table.component';
import { MatTableModule } from '@angular/material';
import { CustomerVehicleSummaryModule } from 'murphy-automotive-shared-library';

@NgModule({
	declarations: [ VehicleHistoryComponent, VehicleHistoryTableComponent ],
	imports: [
		CommonModule,

		MatTableModule,

		CustomerVehicleSummaryModule,

		VehicleHistoryRoutingModule
	],
	entryComponents: [ VehicleHistoryComponent ]
})
export class VehicleHistoryModule {
}

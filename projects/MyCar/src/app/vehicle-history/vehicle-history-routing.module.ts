import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleHistoryComponent } from './vehicle-history.component';

export const vehicleHistoryRoutes: Routes = [
	{
		path: '',
		component: VehicleHistoryComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(vehicleHistoryRoutes) ],
	exports: [ RouterModule ]
})
export class VehicleHistoryRoutingModule {
}

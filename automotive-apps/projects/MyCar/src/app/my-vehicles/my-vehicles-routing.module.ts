import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyVehiclesComponent } from './my-vehicles.component';

export const vehicleRoutes: Routes = [
	{
		path: '',
		component: MyVehiclesComponent
	},
];

@NgModule({
	imports: [ RouterModule.forChild(vehicleRoutes) ],
	exports: [ RouterModule ]
})
export class MyVehiclesRoutingModule {
}

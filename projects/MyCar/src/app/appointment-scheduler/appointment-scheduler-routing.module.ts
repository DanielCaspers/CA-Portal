import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
	CanDeactivateGuard
} from 'murphy-automotive-shared-library';

import { AppointmentSchedulerComponent } from './appointment-scheduler.component';

export const appointmentSchedulerRoutes: Routes = [
	{
		path: '',
		component: AppointmentSchedulerComponent,
		canDeactivate: [CanDeactivateGuard]
	}
];
@NgModule({
	imports: [
		RouterModule.forChild(appointmentSchedulerRoutes),
	],
	exports: [ RouterModule ],
})
export class AppointmentSchedulerRoutingModule {
}

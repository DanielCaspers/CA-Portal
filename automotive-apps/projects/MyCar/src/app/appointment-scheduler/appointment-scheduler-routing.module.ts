import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentSchedulerComponent } from './appointment-scheduler.component';

export const appointmentSchedulerRoutes: Routes = [
	{
		path: '',
		component: AppointmentSchedulerComponent
	}
];
@NgModule({
	imports: [ RouterModule.forChild(appointmentSchedulerRoutes) ],
	exports: [ RouterModule ],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: {
				displayDefaultIndicatorType: false,
				showError: true
			}
		}
	]
})
export class AppointmentSchedulerRoutingModule {
}

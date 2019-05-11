import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentSchedulerComponent } from './appointment-scheduler.component';
import { CanDeactivateGuard } from '../../../../murphy-automotive-shared-library/src/lib/can-deactivate-guard/can-deactivate.guard';

export const appointmentSchedulerRoutes: Routes = [
	{
		path: '',
		component: AppointmentSchedulerComponent,
		canDeactivate: [CanDeactivateGuard]
	}
];
@NgModule({
	imports: [ RouterModule.forChild(appointmentSchedulerRoutes) ],
	exports: [ RouterModule ],

})
export class AppointmentSchedulerRoutingModule {
}

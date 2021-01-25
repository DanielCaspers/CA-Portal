import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreViewComponent } from './core-view/core-view.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';

import { vehicleRoutes } from './my-vehicles/my-vehicles-routing.module';
import { appointmentSchedulerRoutes } from './appointment-scheduler/appointment-scheduler-routing.module';
import { couponRoutes } from './coupons/coupons-routing.module';
import { vehicleHistoryRoutes } from './vehicle-history/vehicle-history-routing.module';
import { vipRewardsRoutes } from './my-account/vip-rewards/vip-rewards-routing.module';
import { accountRoutes } from './my-account/my-account-routing.module';

const routes: Routes = [
	{
		path: '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: CoreViewComponent,
		children: [
			{
				path: '',
				redirectTo: 'vehicles',
				pathMatch: 'full',
				data: {
					title: 'THIS SHOULD NOT BE VISIBLE'
				}
			},
			{
				path: 'account',
				children: accountRoutes,
				data: {
					title: 'My Account'
				}
			},
			{
				path: 'vehicles',
				children: vehicleRoutes,
				data: {
					title: 'My Vehicles'
				}
			},
			{
				path: 'schedule',
				children: appointmentSchedulerRoutes,
				data: {
					title: 'Schedule an Appointment'
				}
			},
			{
				path: 'coupons',
				children: couponRoutes,
				data: {
					title: 'My Coupons'
				}
			},
			{
				path: 'history',
				children: vehicleHistoryRoutes,
				data: {
					title: 'My Vehicle History'
				}
			},
			{
				path: 'rewards',
				children: vipRewardsRoutes,
				data: {
					title: 'My VIP Rewards'
				}
			},
		]
	},
	{
		path: 'login',
		component: LoginComponent,
		data: {
			title: 'THIS SHOULD NOT BE VISIBLE'
		}
	},
	// Coerce any unknown routes into the base URL route, so things like the auth gaurd can figure out what to do with it.
	{
		path: '**',
		redirectTo: '',
		data: {
			title: 'THIS SHOULD NOT BE VISIBLE'
		}
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
}

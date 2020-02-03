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
					title: 'THIS SHOULD BE INVISIBLE'
				}
			},
			{
				path: 'account',
				children: accountRoutes,
				data: {
					title: 'My account'
				}
			},
			{
				path: 'vehicles',
				children: vehicleRoutes,
				data: {
					title: 'My vehicles'
				}
			},
			{
				path: 'schedule',
				children: appointmentSchedulerRoutes,
				data: {
					title: 'Schedule an appointment'
				}
			},
			{
				path: 'coupons',
				children: couponRoutes,
				data: {
					title: 'My coupons'
				}
			},
			{
				path: 'history',
				children: vehicleHistoryRoutes,
				data: {
					title: 'My vehicle history'
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
	{
		path: '**',
		redirectTo: '',
		data: {
			title: "Why does this route expect data?"
		}
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
}

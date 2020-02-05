import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatListModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgxAnalyticsModule } from 'ngx-analytics';

import { NavTitleModule, SafeUrlModule } from 'murphy-automotive-shared-library';

import { CoreViewComponent } from './core-view.component';
import { MyVehiclesModule } from '../my-vehicles/my-vehicles.module';
import { AppointmentSchedulerModule } from '../appointment-scheduler/appointment-scheduler.module';
import { CouponsModule } from '../coupons/coupons.module';
import { VehicleHistoryModule } from '../vehicle-history/vehicle-history.module';
import { MyAccountModule } from '../my-account/my-account.module';
import { LoaderModule } from '../loader/loader.module';
// import { StoreInfoModule } from '../store-info/store-info.module';

@NgModule({
	declarations: [
		CoreViewComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule,

		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule,

		NgxAnalyticsModule,

		// StoreInfoModule,
		SafeUrlModule,
		NavTitleModule,

		MyAccountModule,
		MyVehiclesModule,
		AppointmentSchedulerModule,
		CouponsModule,
		VehicleHistoryModule,
		LoaderModule
	],
	providers: []
})
export class CoreModule {
}

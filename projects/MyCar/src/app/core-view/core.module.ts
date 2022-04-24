import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
// import { NgxAnalyticsModule } from 'ngx-analytics';

import {
	CommitSummaryModule,
	NavTitleModule,
	SafeUrlModule
} from 'murphy-automotive-shared-library';

import { CoreViewComponent } from './core-view.component';
import { MyVehiclesModule } from '../my-vehicles/my-vehicles.module';
import { AppointmentSchedulerModule } from '../appointment-scheduler/appointment-scheduler.module';
import { CouponsModule } from '../coupons/coupons.module';
import { VehicleHistoryModule } from '../vehicle-history/vehicle-history.module';
import { MyAccountModule } from '../my-account/my-account.module';
import { LoaderModule } from '../loader/loader.module';

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

		// NgxAnalyticsModule,

		CommitSummaryModule,
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

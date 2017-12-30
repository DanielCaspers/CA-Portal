import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { CustomerVehicleSummaryModule } from '../shared/customer-vehicle-summary/customer-vehicle-summary.module';
import { CoreViewComponent } from './core-view.component';

@NgModule({
	declarations: [
		CoreViewComponent
	],
	imports: [
		RouterModule,
		FlexLayoutModule,

		MatCardModule,
		MatIconModule,
		MatToolbarModule,

		CustomerVehicleSummaryModule
	],
	providers: []
})
export class CoreModule {
}

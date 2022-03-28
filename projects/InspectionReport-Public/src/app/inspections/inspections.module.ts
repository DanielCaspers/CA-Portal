import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
// import { NgxAnalyticsModule } from 'ngx-analytics';

import {
	CustomerVehicleSummaryModule,
	InspectionHttpModule,
	InspectionReportCustomerConcernsModule,
	InspectionReportItemModule,
	InspectionReportItemListModule,
	InspectionReportGroupedModule,
	RecommendedServiceSeverityModule,
	WorkOrderModule
} from 'murphy-automotive-shared-library';

import { InspectionsRoutingModule } from './inspections.routing';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';

import { environment } from '../../environments/environment';

@NgModule({
	declarations: [
		InspectionDetailComponent,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,

		MatCardModule,
		MatDividerModule,
		MatTabsModule,
		// NgxAnalyticsModule,

		InspectionHttpModule,
		InspectionReportCustomerConcernsModule,
		InspectionReportItemModule,
		InspectionReportGroupedModule,
		InspectionReportItemListModule,
		RecommendedServiceSeverityModule,
		CustomerVehicleSummaryModule,

		InspectionsRoutingModule,
		WorkOrderModule
	],
	providers: [
		{ provide: 'ENVIRONMENT', useValue: environment }
	],
})
export class InspectionsModule {
}

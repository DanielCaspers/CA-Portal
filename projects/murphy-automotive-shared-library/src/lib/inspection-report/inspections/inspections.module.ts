import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
// import { NgxAnalyticsModule } from 'ngx-analytics';

import {
	CustomerVehicleSummaryModule,
	MurphyAutomotiveSharedLibraryModule,
	RecommendedServiceSeverityModule,
	WorkOrderModule
} from 'murphy-automotive-shared-library';

import { InspectionsRoutingModule } from './inspections.routing';
// import { InspectionHttpService } from './inspection-http.service';

// TODO Rewire top down
// import { InspectionCustomerConcernsComponent } from './inspection-customer-concerns/inspection-customer-concerns.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
// import {
// 	InspectionReportItemComponent
// } from './inspection-report-item/inspection-report-item.component';
// import {
// 	InspectionReportItemListComponent
// } from './inspection-report-item-list/inspection-report-item-list.component';
// import {
// 	InspectionReportGroupedComponent
// } from './inspection-report-grouped/inspection-report-grouped.component';

@NgModule({
	declarations: [
		// InspectionCustomerConcernsComponent,
		InspectionDetailComponent,
		// InspectionReportGroupedComponent,
		// InspectionReportItemComponent,
		// InspectionReportItemListComponent,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		HttpClientModule,

		MatButtonModule,
		MatCardModule,
		MatExpansionModule,
		MatIconModule,
		MatTabsModule,
		// NgxAnalyticsModule,

		MurphyAutomotiveSharedLibraryModule,
		CustomerVehicleSummaryModule,
		RecommendedServiceSeverityModule,

		InspectionsRoutingModule,
		WorkOrderModule
	],
	providers: [
		// InspectionHttpService
	],
})
export class InspectionsModule {
}

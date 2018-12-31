import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	MatButtonModule,
	MatCardModule,
	MatExpansionModule,
	MatIconModule,
	MatTabsModule
} from '@angular/material';

import {
	CustomerVehicleSummaryModule, MurphyAutomotiveSharedLibraryModule,
	RecommendedServiceSeverityModule
} from 'murphy-automotive-shared-library';

import { InspectionsRoutingModule } from './inspections.routing';
import { InspectionHttpService } from './inspection-http.service';

import { InspectionCustomerConcernsComponent } from './inspection-customer-concerns/inspection-customer-concerns.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import {
	InspectionReportItemComponent
} from './inspection-report-item/inspection-report-item.component';
import {
	InspectionReportItemListComponent
} from './inspection-report-item-list/inspection-report-item-list.component';
import {
	InspectionReportGroupedComponent
} from './inspection-report-grouped/inspection-report-grouped.component';

import { WorkOrderModule } from '../work-order/work-order.module';

@NgModule({
	declarations: [
		InspectionCustomerConcernsComponent,
		InspectionDetailComponent,
		InspectionReportGroupedComponent,
		InspectionReportItemComponent,
		InspectionReportItemListComponent,
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

		MurphyAutomotiveSharedLibraryModule,
		CustomerVehicleSummaryModule,
		RecommendedServiceSeverityModule,

		InspectionsRoutingModule,
		WorkOrderModule
	],
	providers: [
		InspectionHttpService
	],
})
export class InspectionsModule {
}

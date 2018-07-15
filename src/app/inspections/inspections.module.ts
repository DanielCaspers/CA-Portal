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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
	CustomerVehicleSummaryModule,
	ImageGalleryModule,
	MeasurementsFormDialogModule,
	RecommendedServiceSeverityModule,
	WorkOrderModule
} from '../shared';

import { InspectionsRoutingModule } from './inspections.routing';
import { InspectionHttpService } from './inspection-http.service';

import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionReportGroupedComponent } from './inspection-report-grouped/inspection-report-grouped.component';
import { InspectionTableComponent } from './inspection-table/inspection-table.component';
import {
	InspectionReportItemComponent
} from './inspection-report-item/inspection-report-item.component';
import {
	InspectionReportItemListComponent
} from './inspection-report-item-list/inspection-report-item-list.component';
import { InspectionCustomerConcernsComponent } from './inspection-customer-concerns/inspection-customer-concerns.component';

@NgModule({
	declarations: [
		InspectionDetailComponent,
		InspectionReportGroupedComponent,
		InspectionTableComponent,
		InspectionReportItemComponent,
		InspectionReportItemListComponent,
		InspectionCustomerConcernsComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		HttpClientModule,

		NgxDatatableModule,
		InspectionsRoutingModule,

		RecommendedServiceSeverityModule,
		CustomerVehicleSummaryModule,
		MeasurementsFormDialogModule,
		WorkOrderModule,
		ImageGalleryModule,

		MatButtonModule,
		MatCardModule,
		MatExpansionModule,
		MatIconModule,
		MatTabsModule
	],
	providers: [
		InspectionHttpService
	]
})
export class InspectionsModule {
}

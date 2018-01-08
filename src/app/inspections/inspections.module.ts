import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	MatButtonModule,
	MatCardModule,
	MatExpansionModule,
	MatIconModule,
	MatListModule,
	MatTabsModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ImageGalleryModule } from '../shared/image-gallery/image-gallery.module';
import { RecommendedServiceSeverityModule } from '../shared/recommeneded-service-severity/recommended-service-severity.module';
import { CustomerVehicleSummaryModule } from '../shared/customer-vehicle-summary/customer-vehicle-summary.module';
import { WorkOrderModule } from '../shared/work-order/work-order.module';

import { InspectionsRoutingModule } from './inspections.routing';
import { InspectionService } from './inspection.service';

import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionReportComponent } from './inspection-detail/inspection-report/inspection-report.component';
import { InspectionTableComponent } from './inspection-detail/inspection-table/inspection-table.component';
import {
	InspectionReportItemComponent
} from './inspection-detail/inspection-report/inspection-report-item/inspection-report-item.component';
import {
	InspectionReportGroupComponent
} from './inspection-detail/inspection-report/inspection-report-group/inspection-report-group.component';

@NgModule({
	declarations: [
		InspectionDetailComponent,
		InspectionReportComponent,
		InspectionTableComponent,
		InspectionReportItemComponent,
		InspectionReportGroupComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		HttpClientModule,

		NgxDatatableModule,
		InspectionsRoutingModule,

		RecommendedServiceSeverityModule,
		CustomerVehicleSummaryModule,
		WorkOrderModule,
		ImageGalleryModule,

		MatButtonModule,
		MatCardModule,
		MatExpansionModule,
		MatIconModule,
		MatListModule,
		MatTabsModule
	],
	providers: [
		InspectionService
	]
})
export class InspectionsModule {
}
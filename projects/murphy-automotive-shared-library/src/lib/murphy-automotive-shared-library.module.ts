import { NgModule } from '@angular/core';

import { AutoContrastModule } from './auto-contrast/auto-contrast.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { InspectionReportCoreViewModule } from './inspection-report/core-view/inspection-report-core-view.module';
import { InspectionReportCustomerConcernsModule } from './inspection-report/inspection-customer-concerns/inspection-report-customer-concerns.module';
import { InspectionReportItemModule } from './inspection-report/inspection-report-item/inspection-report-item.module';
import { InspectionReportGroupedModule } from './inspection-report/inspection-report-grouped/inspection-report-grouped.module';
import { InspectionReportItemListModule } from './inspection-report/inspection-report-item-list/inspection-report-item-list.module';
import { InspectionHttpModule } from './inspection-report/inspection-http/inspection-http.module';
import { CustomerVehicleDetailsModule } from './customer-vehicle-details/customer-vehicle-details.module';
import { CustomerVehicleSummaryModule } from './customer-vehicle-summary/customer-vehicle-summary.module';
import { CommitSummaryModule } from './commit-summary/commit-summary.module';
import { GalleryModule } from './gallery/gallery.module';
import { GalleryDialogModule } from './gallery-dialog/gallery-dialog.module';
import { MeasurementsFormDialogModule } from './measurements-form-dialog/measurements-form-dialog.module';
import { NavTitleModule } from './nav-title/nav-title.module';
import { SafeUrlModule } from './safe-url-pipe/safe-url.module';
import { RecommendedServicesModule } from './recommended-services/recommended-services.module';
import { StoreInfoModule } from './http/store-info/store-info.module';
import { WorkOrderModule } from './http/work-order/work-order.module';
import { TelInputModule } from './tel-input/tel-input.module';
import { PhoneNumberPipeModule } from './phone-number-pipe/phone-number.module';
import { VehicleColorIndicatorModule } from './vehicle-color-indicator/vehicle-color-indicator.module';

// @ts-ignore
@NgModule({
	declarations: [],
	imports: [
		NavTitleModule,
		InspectionHttpModule
	],
	exports: [
		AutoContrastModule,
		ConfirmDialogModule,
		InspectionReportCoreViewModule,
		InspectionReportCustomerConcernsModule,
		InspectionReportItemModule,
		InspectionReportGroupedModule,
		InspectionReportItemListModule,
		CommitSummaryModule,
		CustomerVehicleDetailsModule,
		CustomerVehicleSummaryModule,
		GalleryModule,
		GalleryDialogModule,
		MeasurementsFormDialogModule,
		PhoneNumberPipeModule,
		RecommendedServicesModule,
		SafeUrlModule,
		StoreInfoModule,
		TelInputModule,
		VehicleColorIndicatorModule,
		WorkOrderModule
	]
})
export class MurphyAutomotiveSharedLibraryModule {
}

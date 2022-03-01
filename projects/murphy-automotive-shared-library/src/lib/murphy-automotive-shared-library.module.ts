import { NgModule } from '@angular/core';

import { AutoContrastModule } from './auto-contrast/auto-contrast.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { CoreModule } from './inspection-report/core-view/core.module';
import { CustomerVehicleDetailsModule } from './customer-vehicle-details/customer-vehicle-details.module';
import { CustomerVehicleSummaryModule } from './customer-vehicle-summary/customer-vehicle-summary.module';
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
import { InspectionsRoutingModule } from './inspection-report/inspections/inspections.routing';

// @ts-ignore
@NgModule({
	declarations: [],
	imports: [
		NavTitleModule
	],
	exports: [
		AutoContrastModule,
		ConfirmDialogModule,
		CoreModule,
		CustomerVehicleDetailsModule,
		CustomerVehicleSummaryModule,
		GalleryModule,
		GalleryDialogModule,
		InspectionsRoutingModule,
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

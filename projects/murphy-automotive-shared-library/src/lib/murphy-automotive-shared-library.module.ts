import { NgModule } from '@angular/core';

import { AutoContrastModule } from './auto-contrast/auto-contrast.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { CustomerVehicleSummaryModule } from './customer-vehicle-summary/customer-vehicle-summary.module';
import { ImageVideoGalleryDialogModule } from './image-video-gallery-dialog/image-video-gallery-dialog.module';
import { MeasurementsFormDialogModule } from './measurements-form-dialog/measurements-form-dialog.module';
import { NavTitleModule } from './nav-title/nav-title.module';
import { SafeUrlModule } from './safe-url-pipe/safe-url.module';
import { RecommendedServicesModule } from './recommended-services/recommended-services.module';
import { TelInputModule } from './tel-input/tel-input.module';
import { PhoneNumberPipeModule } from './phone-number-pipe/phone-number.module';

@NgModule({
	declarations: [],
	imports: [
		NavTitleModule
	],
	exports: [
		AutoContrastModule,
		ConfirmDialogModule,
		CustomerVehicleSummaryModule,
		ImageVideoGalleryDialogModule,
		MeasurementsFormDialogModule,
		PhoneNumberPipeModule,
		RecommendedServicesModule,
		SafeUrlModule,
		TelInputModule
	]
})
export class MurphyAutomotiveSharedLibraryModule {
}

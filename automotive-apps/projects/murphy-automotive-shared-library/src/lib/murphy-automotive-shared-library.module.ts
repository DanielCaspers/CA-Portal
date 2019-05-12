import { NgModule } from '@angular/core';

import { AutoContrastModule } from './auto-contrast/auto-contrast.module';
import { CustomerVehicleSummaryModule } from './customer-vehicle-summary/customer-vehicle-summary.module';
import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { MeasurementsFormDialogModule } from './measurements-form-dialog/measurements-form-dialog.module';
import { NavTitleModule } from './nav-title/nav-title.module';
import { RecommendedServiceSeverityModule } from './recommended-service-severity/recommended-service-severity.module';
import { SafeUrlModule } from './safe-url-pipe/safe-url.module';

@NgModule({
	declarations: [],
	imports: [
		NavTitleModule
	],
	exports: [
		AutoContrastModule,
		CustomerVehicleSummaryModule,
		ImageGalleryModule,
		MeasurementsFormDialogModule,
		RecommendedServiceSeverityModule,
		SafeUrlModule
	]
})
export class MurphyAutomotiveSharedLibraryModule {
}

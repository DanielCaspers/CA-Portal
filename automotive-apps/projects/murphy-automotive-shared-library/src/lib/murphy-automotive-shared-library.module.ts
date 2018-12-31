import { NgModule } from '@angular/core';
import { CustomerVehicleSummaryModule } from './customer-vehicle-summary/customer-vehicle-summary.module';
import { SafeUrlModule } from './safe-url-pipe/safe-url.module';
import { RecommendedServiceSeverityModule } from './recommended-service-severity/recommended-service-severity.module';
import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { MeasurementsFormDialogModule } from './measurements-form-dialog/measurements-form-dialog.module';

@NgModule({
	declarations: [],
	imports: [],
	exports: [
		CustomerVehicleSummaryModule,
		ImageGalleryModule,
		MeasurementsFormDialogModule,
		RecommendedServiceSeverityModule,
		SafeUrlModule
	]
})
export class MurphyAutomotiveSharedLibraryModule {
}

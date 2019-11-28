import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { RecommendedServicesDialogComponent } from './recommended-services-dialog.component';
import { RecommendedServicesDialogService } from './recommended-services-dialog.service';
import { RecommendedServiceSeverityModule } from '../recommended-service-severity/recommended-service-severity.module';

@NgModule({
	declarations: [
		RecommendedServicesDialogComponent
	],
	entryComponents: [
		RecommendedServicesDialogComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		RecommendedServiceSeverityModule
	],
	providers: [
		RecommendedServicesDialogService
	],
	exports: [
		RecommendedServicesDialogComponent
	]
})
class RecommendedServicesDialogModule {}

export {
	RecommendedServicesDialogModule,
	RecommendedServicesDialogService
};

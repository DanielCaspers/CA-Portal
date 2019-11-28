import { NgModule } from '@angular/core';

import { RecommendedServiceSeverityModule } from './recommended-service-severity/recommended-service-severity.module';
import { RecommendedServicesDialogModule } from './recommended-services-dialog/recommended-services-dialog.module';

@NgModule({
	declarations: [],
	imports: [
		RecommendedServiceSeverityModule,
		RecommendedServicesDialogModule
	],
	exports: [
		RecommendedServiceSeverityModule,
		RecommendedServicesDialogModule
	]
})
export class RecommendedServicesModule {
}

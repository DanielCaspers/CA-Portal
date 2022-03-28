import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';

import {
	RecommendedServiceSeverityModule
} from '../../recommended-services/recommended-service-severity/recommended-service-severity.module';
import { InspectionReportItemModule } from '../inspection-report-item/inspection-report-item.module';
import { InspectionHttpService } from '../inspection-http/inspection-http.service';
import { InspectionReportGroupedComponent } from './inspection-report-grouped.component';

@NgModule({
	declarations: [
		InspectionReportGroupedComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatExpansionModule,
		RecommendedServiceSeverityModule,
		InspectionReportItemModule
	],
	exports: [
		InspectionReportGroupedComponent
	],
	providers: [
		InspectionHttpService
	]
})
export class InspectionReportGroupedModule {
}

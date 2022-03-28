import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
	RecommendedServiceSeverityModule
} from '../../recommended-services/recommended-service-severity/recommended-service-severity.module';
import { InspectionReportItemComponent } from './inspection-report-item.component';

@NgModule({
	declarations: [
		InspectionReportItemComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatButtonModule,
		MatIconModule,
		RecommendedServiceSeverityModule
	],
	exports: [
		InspectionReportItemComponent
	],
	providers: []
})
export class InspectionReportItemModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

import {
	RecommendedServiceSeverityModule
} from '../../recommended-services/recommended-service-severity/recommended-service-severity.module';
import { InspectionReportItemModule } from '../inspection-report-item/inspection-report-item.module';

import { InspectionReportCustomerConcernsComponent } from './inspection-report-customer-concerns.component';

@NgModule({
	declarations: [
		InspectionReportCustomerConcernsComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatDividerModule,
		RecommendedServiceSeverityModule,
		InspectionReportItemModule
	],
	exports: [
		InspectionReportCustomerConcernsComponent
	]
})
export class InspectionReportCustomerConcernsModule {
}

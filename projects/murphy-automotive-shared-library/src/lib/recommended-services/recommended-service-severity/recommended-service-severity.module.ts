import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';

import { RecommendedServiceSeverityComponent } from './recommended-service-severity.component';

@NgModule({
	declarations: [
		RecommendedServiceSeverityComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatIconModule
	],
	exports: [
		RecommendedServiceSeverityComponent
	]
})
export class RecommendedServiceSeverityModule {
}

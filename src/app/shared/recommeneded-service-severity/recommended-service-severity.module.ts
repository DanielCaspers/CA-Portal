import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';

import { RecommenededServiceSeverityComponent } from './recommeneded-service-severity.component';

@NgModule({
	declarations: [
		RecommenededServiceSeverityComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatIconModule
	],
	exports: [
		RecommenededServiceSeverityComponent
	]
})
export class RecommendedServiceSeverityModule {
}

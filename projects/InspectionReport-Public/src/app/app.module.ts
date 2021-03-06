import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAnalyticsModule, NgxAnalyticsSettings } from 'ngx-analytics';
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';

import {
	MurphyAutomotiveSharedLibraryModule,
	NavTitleModule,
	RecommendedServiceSeverityModule
} from 'murphy-automotive-shared-library';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core-view/core.module';
import { InspectionsModule } from './inspections/inspections.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		MatIconModule,

		NgxAnalyticsModule.forRoot([NgxAnalyticsGoogleAnalytics], { pageTracking: { clearIds: true }} as NgxAnalyticsSettings),

		MurphyAutomotiveSharedLibraryModule,
		RecommendedServiceSeverityModule,
		NavTitleModule,

		AppRoutingModule,
		CoreModule,
		InspectionsModule
	],
	providers: [
		{ provide: 'WINDOW', useFactory: getWindow }
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}

export function getWindow() {
	return (typeof window !== 'undefined') ? window : null;
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

		MurphyAutomotiveSharedLibraryModule,
		RecommendedServiceSeverityModule,
		NavTitleModule,

		AppRoutingModule,
		CoreModule,
		InspectionsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}

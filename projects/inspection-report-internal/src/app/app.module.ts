import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
	MurphyAutomotiveSharedLibraryModule,
	NavTitleModule,
} from 'murphy-automotive-shared-library';

import { CoreModule } from '../../../murphy-automotive-shared-library/src/lib/inspection-report/core-view/core.module';
import { InspectionsModule } from 'projects/murphy-automotive-shared-library/src/lib/inspection-report/inspections/inspections.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		MatIconModule,

		NavTitleModule,
		MurphyAutomotiveSharedLibraryModule,

		AppRoutingModule,
		CoreModule,
		InspectionsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}

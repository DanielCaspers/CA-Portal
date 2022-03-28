import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
	MurphyAutomotiveSharedLibraryModule,
	NavTitleModule,
} from 'murphy-automotive-shared-library';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

		NavTitleModule,
		MurphyAutomotiveSharedLibraryModule,

		AppRoutingModule,
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

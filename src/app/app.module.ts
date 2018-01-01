import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core-view/core.module';
import { InspectionsModule } from './inspections/inspections.module';
import { MaAppConfigModule } from '../environments/app-config.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,

		MaAppConfigModule,
		CoreModule,
		InspectionsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}

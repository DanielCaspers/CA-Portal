import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core-view/core.module';
import { AuthModule } from './auth/auth.module';
import { StoreInfoModule } from './store-info/store-info.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		HttpClientModule,

		AppRoutingModule,
		CoreModule,
		AuthModule,
		StoreInfoModule
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	MatCardModule,
	MatIconModule,
	MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgxAnalyticsModule } from 'ngx-analytics';

import { SafeUrlModule } from 'murphy-automotive-shared-library';

import { CoreViewComponent } from './core-view.component';
import { StoreInfoModule } from '../store-info/store-info.module';

@NgModule({
	declarations: [
		CoreViewComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule,

		MatCardModule,
		MatIconModule,
		MatToolbarModule,
		NgxAnalyticsModule,

		StoreInfoModule,
		SafeUrlModule
	],
	providers: []
})
export class CoreModule {
}
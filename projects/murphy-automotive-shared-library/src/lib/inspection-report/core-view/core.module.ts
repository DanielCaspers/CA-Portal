import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterModule } from '@angular/router';
// import { NgxAnalyticsModule } from 'ngx-analytics';

import { SafeUrlModule } from '../../safe-url-pipe/safe-url.module';
import { StoreInfoModule } from '../../http/store-info/store-info.module';

import { CoreViewComponent } from './core-view.component';

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
		// NgxAnalyticsModule,

		StoreInfoModule,
		SafeUrlModule
	],
	providers: []
})
export class CoreModule {
}

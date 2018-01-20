import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import {
	SafeUrlModule,
	StoreInfoModule
} from '../shared';

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

		StoreInfoModule,
		SafeUrlModule
	],
	providers: []
})
export class CoreModule {
}

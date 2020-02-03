import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';
import { LoaderInterceptor } from './loader.interceptor';

@NgModule({
	declarations: [ LoaderComponent ],
	imports: [
		CommonModule,
		MatProgressBarModule
	],
	exports: [
		LoaderComponent
	],
	providers: [
		LoaderService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
	]
})
export class LoaderModule {
}

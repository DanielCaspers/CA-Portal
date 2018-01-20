import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { StoreInfoService } from './store-info.service';
import { StoreInfo } from './store-info.models';

@NgModule({
	imports: [
		HttpClientModule
	],
	providers: [
		StoreInfoService
	]
})
class StoreInfoModule { }

export {
	StoreInfo,
	StoreInfoModule,
	StoreInfoService
};

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { WorkOrderService } from './work-order.service';

@NgModule({
	imports: [
		HttpClientModule
	],
	providers: [
		WorkOrderService
	]
})
export class WorkOrderModule { }

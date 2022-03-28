import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InspectionHttpService } from './inspection-http.service';

@NgModule({
	imports: [
		HttpClientModule
	],
	providers: [
		InspectionHttpService
	]
})
export class InspectionHttpModule {
}

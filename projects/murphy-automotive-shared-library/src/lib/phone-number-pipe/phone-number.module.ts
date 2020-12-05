import { NgModule } from '@angular/core';
import { PhoneNumberPipe } from './phone-number.pipe';

@NgModule({
	declarations: [
		PhoneNumberPipe
	],
	exports: [
		PhoneNumberPipe
	]
})
export class PhoneNumberPipeModule { }

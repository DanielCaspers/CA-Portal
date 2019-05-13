import { NgModule } from '@angular/core';

import { AutoContrastDirective } from './auto-contrast.directive';

@NgModule({
	declarations: [
		AutoContrastDirective
	],
	exports: [
		AutoContrastDirective
	]
})
export class AutoContrastModule { }

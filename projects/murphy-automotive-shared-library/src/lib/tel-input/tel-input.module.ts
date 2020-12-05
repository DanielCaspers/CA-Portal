import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TelInputComponent } from './tel-input.component';
import { MatFormFieldModule } from '@angular/material';

@NgModule({
	declarations: [
		TelInputComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule
	],
	exports: [
		TelInputComponent
	]
})
export class TelInputModule {
}

export * from './tel-input.models';

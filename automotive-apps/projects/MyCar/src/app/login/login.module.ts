import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatProgressBarModule
} from '@angular/material';

import { LoginComponent } from './login.component';

@NgModule({
	declarations: [ LoginComponent ],
	entryComponents: [],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,

		MatButtonModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatProgressBarModule
	]
})
export class LoginModule {
}

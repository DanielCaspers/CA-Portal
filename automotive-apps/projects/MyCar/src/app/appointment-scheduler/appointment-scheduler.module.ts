import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatIconModule,
	MatInputModule,
	MatNativeDateModule,
	MatSelectModule,
	MatStepperModule
} from '@angular/material';

import { AppointmentSchedulerRoutingModule } from './appointment-scheduler-routing.module';
import { AppointmentSchedulerComponent } from './appointment-scheduler.component';


@NgModule({
	declarations: [ AppointmentSchedulerComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,

		MatCheckboxModule,
		MatStepperModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatChipsModule,

		AppointmentSchedulerRoutingModule
	],
	entryComponents: [ AppointmentSchedulerComponent ]
})
export class AppointmentSchedulerModule {
}

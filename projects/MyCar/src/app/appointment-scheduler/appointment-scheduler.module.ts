import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

// import { NgxAnalyticsModule } from 'ngx-analytics';

import {
	CanDeactivateGuard,
	RecommendedServiceSeverityModule,
	SafeUrlModule
} from 'murphy-automotive-shared-library';

import { AppointmentSchedulerRoutingModule } from './appointment-scheduler-routing.module';
import { AppointmentSchedulerComponent } from './appointment-scheduler.component';
import { AppointmentSchedulerHttpService } from './appointment-scheduler-http.service';

@NgModule({
	declarations: [ AppointmentSchedulerComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,

		MatAutocompleteModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatInputModule,
		MatIconModule,
		MatListModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatStepperModule,

		// NgxAnalyticsModule,

		RecommendedServiceSeverityModule,
		SafeUrlModule,

		AppointmentSchedulerRoutingModule
	],
	entryComponents: [ AppointmentSchedulerComponent ],
	providers: [
		AppointmentSchedulerHttpService,
		CanDeactivateGuard,
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: {
				displayDefaultIndicatorType: false,
				showError: true
			}
		}
	]
})
export class AppointmentSchedulerModule {
}

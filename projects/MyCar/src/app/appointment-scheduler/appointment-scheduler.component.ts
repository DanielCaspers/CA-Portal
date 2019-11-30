import {
	Component,
	ElementRef,
	OnInit,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
	Validators
} from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, CanDeactivate } from '@angular/router';

import sortBy from 'lodash-es/sortBy';
import uniqBy from 'lodash-es/uniqBy';

import { Observable, of } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';

import { StoreInfo } from '../store-info/store-info.models';
import { StoreInfoService } from '../store-info/store-info.module';
import { AppointmentSchedulerHttpService } from './appointment-scheduler-http.service';
import { AppointmentScheduleResponse } from './appointment-scheduler.models';
import { VehiclesHttpService } from '../my-vehicles/vehicles-http.service';
import { VehicleOverview } from '../my-vehicles/vehicle.models';

export const AtLeastOne = (validator: ValidatorFn) => (
	group: FormGroup,
): ValidationErrors | null => {
	const controls = group && group.controls && Object.keys(group.controls);
	const hasAtLeastOneControlFailedValidatorFn = controls.some(k => !validator(group.controls[k]));

	console.log('AtLeastOne validator executed', controls, hasAtLeastOneControlFailedValidatorFn);

	return hasAtLeastOneControlFailedValidatorFn ? null : { atLeastOne: true };
};

export interface DynamicFormData {
	formValue: string;
	viewValue: string;
}

export enum ScheduleProcess {
	Entry = 'Entry',
	IsSubmitting = 'IsSubmitting',
	Success = 'Success',
	Fail = 'Fail'
}

@Component({
	selector: 'ma-appointment-scheduler',
	templateUrl: './appointment-scheduler.component.html',
	styleUrls: [ './appointment-scheduler.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class AppointmentSchedulerComponent implements OnInit, CanDeactivate<AppointmentSchedulerComponent> {
	public scheduleProgress: ScheduleProcess = ScheduleProcess.Entry;

	public storeInfo: StoreInfo = {
		PhoneNumberToCall: {
			NumberForWebLink: '+19524322454'
		}
	};

	// Autocomplete inputs config
	public readonly separatorKeysCodes: number[] = [ENTER];

	// Step 3: Select date
	/**
	 * Set the minimum date to now so users cannot schedule appointments in the past
	 */
	public minDate = new Date();

	/**
	 * Prevent users from scheduling too far in advance.
	 */
	public maxDate = new Date().setMonth(this.minDate.getMonth() + 2);

	public dateFormGroup: FormGroup;
	public dateFilter = (d: Date) => {
		const formattedDate = this.dateFormatter(d);
		return this.daysAvailable.includes(formattedDate);
	};

	/**
	 * A list of days available for the calendar view-model to
	 * determine if the date is available for scheduling.
	 */
	private daysAvailable: string[];

	private dateFormatter(d: Date): string {
		const month = d.getUTCMonth() + 1;
		return `${month}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
	}

	// Step 4: Select vehicle
	public vehicleFormGroup: FormGroup;
	public isVehicleNewToCustomer: 'New' | 'Existing' = 'Existing';

	private vehicleId: string;

	/**
	 * A user's vehicles if the schedule an appointment for
	 * an existing vehicle
	 */
	public myVehicles: DynamicFormData[] = [];

	/**
	 * Valid vehicle years if scheduling an appointment
	 * for a new vehicle.
	 */
	public vehicleYears: DynamicFormData[] = [];

	/**
	 * Valid vehicle makes if scheduling an appointment
	 * for a new vehicle.
	 */
	public vehicleMakes: DynamicFormData[] = [];

	/**
	 * Valid vehicle models if scheduling an appointment
	 * for a new vehicle.
	 */
	public vehicleModels: DynamicFormData[] = [];

	// Step 5: Describe vehicle needs
	public issuesFormGroup: FormGroup;

	/**
	 * Selected issues which the user would like addressed or investigated
	 */
	public issues: DynamicFormData[] = [];

	/**
	 * All common issues returned by the API
	 */
	public allIssues: DynamicFormData[] = [];

	/**
	 * Filtered issues to choose from based on autocomplete input
	 */
	public filteredIssues: Observable<DynamicFormData[]>;

	@ViewChild('issueInput', {static: false}) issueInput: ElementRef<HTMLInputElement>;

	constructor(
		private appointmentSchedulerHttpService: AppointmentSchedulerHttpService,
		private dialogService: MatDialog,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private storeInfoService: StoreInfoService,
		private vehiclesHttpService: VehiclesHttpService) {
	}

	public ngOnInit(): void {
		this.buildForm();

		this.filteredIssues = this.commonIssues.valueChanges
			.pipe(
				startWith(null),
				map((issue: string | null) => !!issue ? this.filterIssues(issue) : [...this.allIssues] )
			);

		this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');

		// HTTP Requests
		this.getStoreInfo();
		this.getScheduleViewModel();
		this.getVehiclesForClient();
		this.getVehicleYears();
	}

	public canDeactivate(): Observable<boolean> | boolean {
		// Allow synchronous navigation if no fields have a value
		if (this.dateFormGroup.pristine && this.vehicleFormGroup.pristine && this.issuesFormGroup.pristine) {
			return true;
		}

		// Allow navigation away if the form was successfully submitted
		if (this.scheduleProgress == ScheduleProcess.Success) {
			return true;
		}

		const confirmation = window.confirm('Discard unsaved changes and leave the page?');

		return of(confirmation);
	}

	/*
	 * HTTP Requests
	 */
	private getScheduleViewModel(): void {
		this.appointmentSchedulerHttpService.getScheduleViewModel()
			.pipe(
				first()
			).subscribe((response: AppointmentScheduleResponse) => {
				this.daysAvailable = response.daysAvailable.map(this.dateFormatter);
				this.allIssues = response.problemDescriptions;
			});
	}

	private getStoreInfo(): void {
		this.storeInfoService.getStoreInfo()
			.pipe(
				first()
			)
			.subscribe(storeInfo => {
				this.storeInfo = storeInfo;
			});
	}

	private getVehiclesForClient(): void {
		this.vehiclesHttpService.getVehiclesForClient()
			.pipe(first())
			.subscribe((vehicles: VehicleOverview[]) => {
				this.myVehicles = vehicles.map((v) => {
					return {
						formValue: v.vehicleID,
						viewValue: `${v.year} ${v.make} ${v.model} (${v.license})`
					}
				});
				this.myVehicles = sortBy(this.myVehicles, 'viewValue');

				// If the is scheduling an appointment with an existing vehicle, auto-select the input
				if (!!this.vehicleId) {
					this.knownVehicle.setValue(this.vehicleId);
				}
				else {
					this.knownVehicle.setValue(null);
				}
			});
	}

	private getVehicleYears(): void {
		this.appointmentSchedulerHttpService.getVehicleYears()
			.pipe(
				first()
			).subscribe((response: DynamicFormData[]) => {
			this.vehicleYears = response;
		});
	}

	private getVehicleMakesByYear(): void {
		this.appointmentSchedulerHttpService.getVehicleMakesByYear(this.year.value)
			.pipe(
				first()
			).subscribe((response: DynamicFormData[]) => {
			this.vehicleMakes = response;
		});
	}

	private getVehicleModelsByYearAndMake(): void {
		this.appointmentSchedulerHttpService.getVehicleModelsByYearAndMake(this.year.value, this.make.value)
			.pipe(
				first()
			).subscribe((response: DynamicFormData[]) => {
			this.vehicleModels = response;
		});
	}

	/*
	 * Date filtering and date picker methods
	 */
	public onDatePickerOpened(): void {
		this.getScheduleViewModel();
	}

	/*
	 * Autocomplete chip list methods
	 */
	public addFromAutocomplete(event) {
		let value: DynamicFormData = event.option.value;

		// Add our issue
		if (value.viewValue.trim()) {
			// TODO Work on looking up form value code from allIssues for use here
			this.issues = uniqBy([...this.issues, {viewValue: value.viewValue.trim() , formValue: value }], 'viewValue');
		}

		this.commonIssues.setValue(null);
		this.issueInput.nativeElement.value = '';
	}
	// public addFromAutocomplete(event) {
	// 	const input = event.option.input;
	// 	const value = event.option.value.formValue;
	// 	if ((value.trim() !== '')) {
	// 		this.commonIssues.setErrors(null);   // 1
	// 		if (this.commonIssues.valid) {              // 4
	// 			this.commonIssues.markAsDirty();
	// 			this.issueInput.nativeElement.value = '';
	// 			this.commonIssues.setValue(null);
	// 		} else {
	// 			const index = this.issues.findIndex(value1 => value1 === value.trim());
	// 			if (index !== -1) {
	// 				this.issues.splice(index, 1);           // 6
	// 			}
	// 		}
	// 	} else {
	// 		this.commonIssues.updateValueAndValidity();  // 7
	// 	}
	// }

	public remove(item): void {
		const index = this.issues.indexOf(item);

		if (index >= 0) {
			this.issues.splice(index, 1);
		}

		this.commonIssues.updateValueAndValidity();  // <---- Here it is
		this.commonIssues.markAsDirty();
	}

	/*
	 * Step 4: Vehicle Selection
	 */
	public onNewOrExistingVehicleChange($event): void {
		this.isVehicleNewToCustomer = $event.value;

		this.buildVehicleForm();
	}

	public onYearChange(): void {
		this.getVehicleMakesByYear();
	}

	public onMakeChange(): void {
		this.getVehicleModelsByYearAndMake();
	}

	/*
	 * Final Step: Submit!
	 */

	public onSubmit(): void {
		this.scheduleProgress = ScheduleProcess.IsSubmitting;
		console.log('VehicleFormGroup', this.vehicleFormGroup);
		console.log('DateFormGroup', this.dateFormGroup);
		console.log('IssuesFormGroup', this.issuesFormGroup);

		setTimeout(() => {
			this.scheduleProgress = ScheduleProcess.Success;
		}, 1000);
	}

	/*
	 * Angular Reactive Form Accessors
	 */
	public get date(): FormControl {
		return this.dateFormGroup.get('date') as any;
	}

	public get knownVehicle(): FormControl {
		return this.vehicleFormGroup.get('knownVehicle') as any;
	}

	public get year(): FormControl {
		return this.vehicleFormGroup.get('year') as any;
	}

	public get make(): FormControl {
		return this.vehicleFormGroup.get('make') as any;
	}

	public get model(): FormControl {
		return this.vehicleFormGroup.get('model') as any;
	}

	public get commonIssues(): FormControl {
		return this.issuesFormGroup.get('commonIssues') as any;
	}

	public get issueDescription(): FormControl {
		return this.issuesFormGroup.get('issueDescription') as any;
	}

	private buildForm(): void {
		this.dateFormGroup = this.formBuilder.group({
			date: ['', Validators.required]
		});

		this.buildVehicleForm();

		this.issuesFormGroup = this.formBuilder.group({
			commonIssues: [''],
			issueDescription: ['']
		}, { validators: AtLeastOne(Validators.required)});
	}

	private filterIssues(value: DynamicFormData | string | null): DynamicFormData[] {
		const filterValue = !!(value as DynamicFormData) && (value as DynamicFormData).viewValue ?
			(value as DynamicFormData).viewValue :
			value;

		return this.allIssues.filter(i => i.viewValue.toLowerCase().includes((filterValue as any).toLowerCase()));
	}

	private buildVehicleForm(): void {
		this.vehicleFormGroup = this.isVehicleNewToCustomer === 'New' ? this.newVehicleForm : this.existingVehicleForm;

		this.vehicleFormGroup.markAsPristine();
	}

	private get newVehicleForm(): FormGroup {
		return this.formBuilder.group({
			year: ['', Validators.required],
			make: ['', Validators.required],
			model: ['', Validators.required]
		});
	}

	private get existingVehicleForm(): FormGroup {
		return this.formBuilder.group({
			knownVehicle: ['', Validators.required]
		});
	}
}

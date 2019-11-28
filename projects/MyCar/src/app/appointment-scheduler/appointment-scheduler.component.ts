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
	FormGroup, ValidationErrors, ValidatorFn,
	Validators
} from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material';
import { CanDeactivate } from '@angular/router';

import uniqBy from 'lodash-es/uniqBy';

import { Observable, of } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';

import { StoreInfo } from '../store-info/store-info.models';
import { StoreInfoService } from '../store-info/store-info.module';
import { AppointmentSchedulerHttpService } from './appointment-scheduler-http.service';
import { AppointmentScheduleResponse } from './appointment-scheduler.models';

export const AtLeastOne = (validator: ValidatorFn) => (
	group: FormGroup,
): ValidationErrors | null => {
	const hasAtLeastOne = group && group.controls && Object.keys(group.controls)
		.some(k => !validator(group.controls[k]));

	return hasAtLeastOne ? null : {
		atLeastOne: true,
	};
};

interface DynamicFormData {
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

	public appointmentSchedulerResponse: AppointmentScheduleResponse;

	public storeInfo: StoreInfo = {
		PhoneNumberToCall: {
			NumberForWebLink: '+19524322454'
		}
	};

	// Stepper config
	public isLinear = true;

	// Autocomplete inputs config
	public readonly chipIsSelectable = true;
	public readonly chipIsRemovable = true;
	public readonly chipAddsOnBlur = false;
	public readonly separatorKeysCodes: number[] = [ENTER];

	// Step 3: Select date
	public dateFormGroup: FormGroup;
	public minDate = new Date();
	public maxDate = new Date();
	public dateFilter = (d: Date) => {
		// TODO DJC Discuss with dad to see if he can easily do ISO strings
		return this.appointmentSchedulerResponse.daysAvailable.includes(d.toISOString());
	};

	// Step 4: Select vehicle
	public vehicleFormGroup: FormGroup;
	public isVehicleNewToCustomer: 'New' | 'Existing' = 'Existing';

	// Step 5: Describe vehicle needs
	public issuesFormGroup: FormGroup;

	public myVehicles: DynamicFormData[] = [
		{formValue: 'VIN1', viewValue: '2006 Chevrolet Impala 293-GBE'},
		{formValue: 'VIN2', viewValue: '2011 Toyota Avalon 293-GBE'}
	];

	public vehicleMakes: DynamicFormData[] = [
		{formValue: 'Chevrolet', viewValue: 'Chevrolet'},
		{formValue: 'Ford', viewValue: 'Ford'},
		{formValue: 'Jeep', viewValue: 'Jeep'}
	];

	public vehicleModels: DynamicFormData[] = [
		{formValue: 'Impala', viewValue: 'Impala'},
		{formValue: 'Mustang', viewValue: 'Mustang'},
		{formValue: 'Wrangler', viewValue: 'Wrangler'}
	];

	public issues: DynamicFormData[] = [];

	public allIssues: DynamicFormData[] = [
		{formValue: 'Squeaky brakes', viewValue: 'Squeaky brakes'},
		{formValue: 'Tire tread low', viewValue: 'Tire tread low'},
		{formValue: 'Clicking noise in dash', viewValue: 'Clicking noise in dash'},
		{formValue: 'Coolant leaking', viewValue: 'Coolant leaking'},
		{formValue: 'Coolant level low', viewValue: 'Coolant level low'},
		{formValue: 'Coolant freeze protection low', viewValue: 'Coolant freeze protection low'},
		{formValue: 'Coolant flush required', viewValue: 'Coolant flush required'},
		{formValue: 'Coolant is dirty', viewValue: 'Coolant is dirty'}
	];

	public filteredIssues: Observable<DynamicFormData[]>;

	@ViewChild('issueInput', {static: false}) issueInput: ElementRef<HTMLInputElement>;

	constructor(
		private appointmentSchedulerHttpService: AppointmentSchedulerHttpService,
		private dialogService: MatDialog,
		private formBuilder: FormBuilder,
		private storeInfoService: StoreInfoService) {
		// Prevent users from scheduling too far in advance.
		this.maxDate.setMonth(this.maxDate.getMonth() + 1);
	}

	public ngOnInit(): void {
		this.buildForm();

		this.filteredIssues = this.commonIssues.valueChanges.pipe(
			startWith(null),
			map((issue: string | null) => !!issue ? this.filterIssues(issue) : [...this.allIssues] )
		);

		this.storeInfoService.getStoreInfo()
			.pipe(
				first()
			)
			.subscribe(storeInfo => {
				this.storeInfo = storeInfo;
			});

		this.getAvailableDates();
	}

	public canDeactivate(): Observable<boolean> | boolean {
		// Allow synchronous navigation if no fields have a value
		if (this.dateFormGroup.pristine && this.vehicleFormGroup.pristine && this.issuesFormGroup.pristine) {
			return true;
		}

		const confirmation = window.confirm('Discard unsaved changes and leave the page?');

		return of(confirmation);
	}

	/*
	 * Date filtering and date picker methods
	 */
	public onDatePickerOpened(): void {
		this.getAvailableDates();
	}

	private getAvailableDates(): void {
		this.appointmentSchedulerHttpService.getAvaliableDates()
			.pipe(
				first()
			).subscribe((response: AppointmentScheduleResponse) => {
			this.appointmentSchedulerResponse = response;
		});
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

	public remove(item): void {
		const index = this.issues.indexOf(item);

		if (index >= 0) {
			this.issues.splice(index, 1);
		}
	}

	public onNewOrExistingVehicleChange($event): void {
		this.isVehicleNewToCustomer = $event.value;

		this.buildVehicleForm();
	}

	public onSubmit(): void {
		this.scheduleProgress = ScheduleProcess.IsSubmitting;
		console.log(this.vehicleFormGroup);
		console.log(this.dateFormGroup);

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

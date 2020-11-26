import {
	Component,
	ElementRef,
	OnInit,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {
	AbstractControl,
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

import { Observable, of, Subscription } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';

import { RecommendedService } from 'murphy-automotive-shared-library/lib/recommended-services/recommended-services.models';

import { StoreInfo } from '../store-info/store-info.models';
import { StoreInfoService } from '../store-info/store-info.module';
import { AppointmentSchedulerHttpService } from './appointment-scheduler-http.service';
import { AppointmentScheduleResponse, AppointmentType } from './appointment-scheduler.models';
import { VehiclesHttpService } from '../my-vehicles/vehicles-http.service';
import { VehicleBase, VehicleOverview } from '../my-vehicles/vehicle.models';

/**
 * If the form field is null, give it a free pass.
 * Else, let it continue on to the required attribute validation.
 * This allows us to let common issues and concerns pass through once one or more have been entered.
 */
export const RequiredOrNull = (control: AbstractControl): ValidationErrors | null  => {
	return control.value === null ? null : Validators.required(control);
};

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

	public storeInfo: StoreInfo;

	// Step 1: Need to schedule?
	/**
	 * Text-based bullet list describing reasons why one should not schedule via the app
	 */
	public reasonsToAvoidScheduling: string[];

	// Step 2: Renting a car?
	/**
	 * Text used for the 'Renting a car?' step
	 */
	public rentalCarBodyText: string;

	// Step 3: Select date
	/**
	 * Main body text used for the 'Which day?' step
	 */
	public daySelectionBodyText: string;

	/**
	 * Caption text used for the 'Which day?' step
	 */
	public daySelectionCaptionText: string;

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
	}

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

	public appointmentType: AppointmentType = AppointmentType.ExistingVehicle;

	private vehicleId: string;

	/**
	 * Used to provide vehicle scheduling information for when an existing vehicle is chosen for an appointment.
	 */
	private myVehicles: VehicleOverview[] = [];

	/**
	 * A user's vehicles if the schedule an appointment for
	 * an existing vehicle
	 */
	public myVehicleOptions: DynamicFormData[] = [];

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

	private knownVehicleChangeSubscription: Subscription = null;

	// Step 5: Describe vehicle needs
	public issuesFormGroup: FormGroup;

	// Autocomplete inputs config
	public readonly separatorKeysCodes: number[] = [ENTER];

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

	public atLeastOneFormFieldRequiredText = 'A recommended service, common issue, detailed description is required';

	public recommendedServices: RecommendedService[] = [];

	public scheduleProgress: ScheduleProcess = ScheduleProcess.Entry;

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
		if (this.scheduleProgress === ScheduleProcess.Success) {
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
				this.reasonsToAvoidScheduling = response.reasonsToAvoidScheduling;
				this.daySelectionBodyText = response.daySelectionBodyText;
				this.daySelectionCaptionText = response.daySelectionCaptionText;
				this.rentalCarBodyText = response.rentalCarBodyText;
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
				this.myVehicles = vehicles;
				this.myVehicleOptions = vehicles
					.map((v) => {
						// When clients schedule vehicles which have not yet been serviced,
						// they are entered into the vehicles collection without having been
						// inserted with an ID. Therefore, we make the following identifier which is
						// *unlikely* to collide for normal cases.
						// In the event that the user has identical new vehicles of some year, make and model,
						// picking one arbitrarily will have the same effect on the back end of making a new record.
						const vehicleIdentifier = v.vehicleID === '' ?
							this.getVehicleOptionViewValue(v) :
							v.vehicleID;
						return {
							formValue: vehicleIdentifier,
							viewValue: this.getVehicleOptionViewValue(v)
						};
					});
				this.myVehicleOptions = sortBy(this.myVehicleOptions, 'viewValue');

				// If the is scheduling an appointment with an existing vehicle, auto-select the input
				if (!!this.vehicleId) {
					this.knownVehicle.setValue(this.vehicleId);

				} else {
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

	private getVehicleOptionViewValue(v: VehicleBase): string {
		return `${v.year} ${v.make} ${v.model} (${v.license})`;
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
		const value: DynamicFormData = event.option.value;

		// Add our issue
		if (value.viewValue.trim()) {
			// TODO Work on looking up form value code from allIssues for use here
			this.issues = uniqBy([...this.issues, {viewValue: value.viewValue.trim() , formValue: value }], 'viewValue');
		}

		this.commonIssues.setValue(null);
		this.issueInput.nativeElement.value = '';

		this.commonIssues.updateValueAndValidity();
	}

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
		this.appointmentType = $event.value;

		this.issuesFormGroup.controls['recommendedServices'].setValue([]);
		this.recommendedServices = [];

		this.buildVehicleForm();
		if (this.knownVehicle != null) {
			this.knownVehicle.setValue(null);
		}
	}

	public onYearChange(): void {
		this.getVehicleMakesByYear();
	}

	public onMakeChange(): void {
		this.getVehicleModelsByYearAndMake();
	}

	private getRecommendedServicesForKnownVehicle(): void {
		if (!!this.knownVehicle && !!this.knownVehicle.value) {
			const vehicle = this.myVehicles.find(v => v.vehicleID === this.knownVehicle.value);
			if (vehicle === null) {
				console.warn('Attempted to fetch recommended services for a vehicle which has no VIN associated. No recommended services will be reported.');

			} else {
				this.recommendedServices = vehicle.recommendedServices;
			}

		} else {
			console.log('A known vehicle was not provided. Recommended services will not be available for selection.');
		}
	}

	public onKnownVehicleChange() {
		this.issuesFormGroup.controls['recommendedServices'].setValue([]);
		this.recommendedServices = [];
		this.getRecommendedServicesForKnownVehicle();
	}

	/*
	 * Final Step: Submit!
	 */
	public onSubmit(): void {
		this.scheduleProgress = ScheduleProcess.IsSubmitting;
		const request: any = {
			ScheduleDate: this.date.value,
			AppointmentType: this.appointmentType,
		};

		// If the vehicle is already known (by VIN match), fill out all known details for request model
		if (!!this.knownVehicle && !!this.knownVehicle.value) {
			let vehicle = this.myVehicles.find(v => v.vehicleID === this.knownVehicle.value);
			if (vehicle === null) {
				console.warn('Attempted to submit a vehicle which has no VIN associated. The search will be re-attempted by year, make and model.');
				vehicle = this.myVehicles.find(v => this.getVehicleOptionViewValue(v) === this.knownVehicle.value);

			} else {
				request.license = vehicle.license;
				request.color = vehicle.color;
				request.engine = vehicle.engine;
				request.transmission = vehicle.transmission;
				request.vehicleID = vehicle.vehicleID;

				const recommendedServiceIds = this.issuesFormGroup.get('recommendedServices').value;
				const recommendedServicesToAddress = recommendedServiceIds.map(rsId => this.recommendedServices.find(rs => rs.Id === rsId));
				const recommendedServiceWorkDescriptions = recommendedServicesToAddress.map(rs => `${rs.Description} LVL=${rs.Severity} [${rs.OrderId}] ${rs.TechnicianId}`);

				request.WorkDescription = [...recommendedServiceWorkDescriptions, ...this.issues.map(i => i.viewValue), this.issueDescription.value];
			}
			request.year = vehicle.year;
			request.make = vehicle.make;
			request.model = vehicle.model;

		} else {
			// If the vehicle has not been here before, underpost.
			request.year = this.year.value;
			request.make = this.make.value;
			request.model = this.model.value;
			request.WorkDescription = [...this.issues.map(i => i.viewValue), this.issueDescription.value];
		}

		this.appointmentSchedulerHttpService.scheduleAppointment(request)
			.pipe(first())
			.subscribe((confirmationDto) => {
				console.log(confirmationDto);
				this.scheduleProgress = ScheduleProcess.Success;
			},
			(error) => {
				console.error(error);
				this.scheduleProgress = ScheduleProcess.Fail;
			});
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
			issueDescription: [''],
			recommendedServices: ['']
		}, { validators: AtLeastOne(RequiredOrNull)});
	}

	private filterIssues(value: DynamicFormData | string | null): DynamicFormData[] {
		const filterValue = !!(value as DynamicFormData) && (value as DynamicFormData).viewValue ?
			(value as DynamicFormData).viewValue :
			value;

		return this.allIssues.filter(i => i.viewValue.toLowerCase().includes((filterValue as any).toLowerCase()));
	}

	private buildVehicleForm(): void {
		if (this.knownVehicleChangeSubscription !== null) {
			this.knownVehicleChangeSubscription.unsubscribe();
		}

		this.vehicleFormGroup = this.appointmentType === AppointmentType.NewVehicle ?
			this.newVehicleForm :
			this.existingVehicleForm;

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
		const fg =  this.formBuilder.group({
			knownVehicle: ['', Validators.required]
		});

		this.knownVehicleChangeSubscription =
			fg.controls['knownVehicle'].valueChanges.subscribe(() => this.getRecommendedServicesForKnownVehicle());

		return fg;
	}


}

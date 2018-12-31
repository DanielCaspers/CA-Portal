import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatChipInputEvent } from '@angular/material';

@Component({
	selector: 'ma-appointment-scheduler',
	templateUrl: './appointment-scheduler.component.html',
	styleUrls: [ './appointment-scheduler.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class AppointmentSchedulerComponent implements OnInit {
	isLinear = false;
	firstFormGroup: FormGroup;
	vehicleFormGroup: FormGroup;
	dateFormGroup: FormGroup;

	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER];
	fruits: any[] = [
		{name: 'Squeaky brakes'},
		{name: 'Tire tread low'},
		{name: 'Fan makes bizarre clicking noise'},
	];

	@ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
	@ViewChild('auto') matAutocomplete: MatAutocomplete;

	constructor(private _formBuilder: FormBuilder) {
	}

	public add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our fruit
		if ((value || '').trim()) {
			this.fruits.push({name: value.trim()});
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	public remove(fruit): void {
		const index = this.fruits.indexOf(fruit);

		if (index >= 0) {
			this.fruits.splice(index, 1);
		}
	}

	public ngOnInit(): void {
		this.firstFormGroup = this._formBuilder.group({
			requiresRentalCar: ['', Validators.required],
			doesNotRequireScheduling: ['', Validators.required]
		});
		this.vehicleFormGroup = this._formBuilder.group({
			vehicle: ['', Validators.required],
			date: ['', Validators.required]
		});
		this.dateFormGroup = this._formBuilder.group({
			date: ['', Validators.required]
		});
	}

}

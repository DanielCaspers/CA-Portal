import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
	Component,
	ElementRef,
	Inject,
	Input,
	OnDestroy,
	Optional,
	Self,
	ViewChild
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	UntypedFormBuilder,
	UntypedFormGroup,
	NgControl,
	Validators
} from '@angular/forms';
import {MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import { TelephoneViewModel } from './tel-input.models';

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
	selector: 'ma-tel-input',
	templateUrl: 'tel-input.component.html',
	styleUrls: ['tel-input.component.scss'],
	providers: [{ provide: MatFormFieldControl, useExisting: TelInputComponent }],
	host: {
		'[class.tel-floating]': 'shouldLabelFloat',
		'[id]': 'id',
	}
})
export class TelInputComponent
	implements ControlValueAccessor, MatFormFieldControl<TelephoneViewModel>, OnDestroy {
	static nextId = 0;
	@ViewChild('area', {static: false}) areaInput: HTMLInputElement;
	@ViewChild('exchange', {static: false}) exchangeInput: HTMLInputElement;
	@ViewChild('subscriber', {static: false}) subscriberInput: HTMLInputElement;

	parts: UntypedFormGroup;
	stateChanges = new Subject<void>();
	focused = false;
	controlType = 'tel-input';
	id = `tel-input-${TelInputComponent.nextId++}`;
	onChange = (_: any) => {};
	onTouched = () => {};

	get empty() {
		const {
			value: { area, exchange, subscriber }
		} = this.parts;

		return !area && !exchange && !subscriber;
	}

	get shouldLabelFloat() {
		return this.focused || !this.empty;
	}

	@Input('aria-describedby') userAriaDescribedBy: string;

	@Input()
	get placeholder(): string {
		return this._placeholder;
	}
	set placeholder(value: string) {
		this._placeholder = value;
		this.stateChanges.next();
	}
	private _placeholder: string;

	@Input()
	get required(): boolean {
		return this._required;
	}
	set required(value: boolean) {
		this._required = coerceBooleanProperty(value);
		this.stateChanges.next();
	}
	private _required = false;

	@Input()
	get disabled(): boolean {
		return this._disabled;
	}
	set disabled(value: boolean) {
		this._disabled = coerceBooleanProperty(value);
		this._disabled ? this.parts.disable() : this.parts.enable();
		this.stateChanges.next();
	}
	private _disabled = false;

	@Input()
	get value(): TelephoneViewModel | null {
		if (this.parts.valid) {
			const {
				value: { area, exchange, subscriber }
			} = this.parts;
			return new TelephoneViewModel(area, exchange, subscriber);
		}
		return null;
	}
	set value(tel: TelephoneViewModel | null) {
		const { area, exchange, subscriber } = tel || new TelephoneViewModel('', '', '');
		this.parts.setValue({ area, exchange, subscriber });
		this.parts.updateValueAndValidity({onlySelf: false, emitEvent: true });
		this.stateChanges.next();
	}

	get errorState(): boolean {
		return this.parts.invalid && this.parts.dirty;
	}

	constructor(
		formBuilder: UntypedFormBuilder,
		private _focusMonitor: FocusMonitor,
		private _elementRef: ElementRef<HTMLElement>,
		@Optional() @Inject(MatFormField) public _formField: MatFormField,
		@Optional() @Self() public ngControl: NgControl) {

		this.parts = formBuilder.group({
			area: [
				null,
				[Validators.required, Validators.minLength(3), Validators.maxLength(3)]
			],
			exchange: [
				null,
				[Validators.required, Validators.minLength(3), Validators.maxLength(3)]
			],
			subscriber: [
				null,
				[Validators.required, Validators.minLength(4), Validators.maxLength(4)]
			]
		});

		_focusMonitor.monitor(_elementRef, true).subscribe(origin => {
			if (this.focused && !origin) {
				this.onTouched();
			}
			this.focused = !!origin;
			this.stateChanges.next();
		});

		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
		if (!control.errors && nextElement) {
			this._focusMonitor.focusVia(nextElement, 'program');
		}
	}

	autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
		if (control.value.length < 1) {
			this._focusMonitor.focusVia(prevElement, 'program');
		}
	}

	ngOnDestroy() {
		this.stateChanges.complete();
		this._focusMonitor.stopMonitoring(this._elementRef);
	}

	setDescribedByIds(ids: string[]) {
		const controlElement = this._elementRef.nativeElement
			.querySelector('.tel-input-container')!;
		controlElement.setAttribute('aria-describedby', ids.join(' '));
	}

	onContainerClick() {
		if (this.parts.controls.subscriber.valid) {
			this._focusMonitor.focusVia(this.subscriberInput, 'program');
		} else if (this.parts.controls.exchange.valid) {
			this._focusMonitor.focusVia(this.subscriberInput, 'program');
		} else if (this.parts.controls.area.valid) {
			this._focusMonitor.focusVia(this.exchangeInput, 'program');
		} else {
			this._focusMonitor.focusVia(this.areaInput, 'program');
		}
	}

	writeValue(tel: TelephoneViewModel | null): void {
		this.value = tel;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	_handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
		this.autoFocusNext(control, nextElement);
		this.onChange(this.value);
	}

	// static ngAcceptInputType_disabled: boolean | string | null | undefined;
	// static ngAcceptInputType_required: boolean | string | null | undefined;
}

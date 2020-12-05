import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import { MatAccordionDisplayMode } from '@angular/material/expansion';

import { first } from 'rxjs/operators';

import { AccountOverview, Address, EmailAddress, PhoneNumber } from './account.models';
import { AccountHttpService } from './account-http.service';
import { ConfirmDialogService } from 'murphy-automotive-shared-library';
import { TelephoneViewModel } from '../../../../murphy-automotive-shared-library/src/lib/tel-input/tel-input.models';

@Component({
	selector: 'ma-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: [ './my-account.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class MyAccountComponent implements OnInit {

	public account: AccountOverview;
	public addressFormGroup: FormGroup;
	public emailFormArray: FormArray;
	public phoneFormArray: FormArray;

	/**
	 * Use as a feature flag and to automatically handle structural directive template binding scoping.
	 * Without this, tooltips being looped in the formarrays would not uniquely reference on
	 * the appropriate line.
	 */
	public readonly displayTooltips = true;

	public isEditingAddressForm = false;
	public isEditingEmailForm = false;
	public isEditingPhoneForm = false;

	public readonly accordionDisplayMode: MatAccordionDisplayMode = 'flat';

	public readonly stateOptions: {name: string, value: string}[] = [
		{'name': 'Alabama', 'value': 'AL'},
		{'name': 'Alaska', 'value': 'AK'},
		{'name': 'Arizona', 'value': 'AZ'},
		{'name': 'Arkansas', 'value': 'AR'},
		{'name': 'California', 'value': 'CA'},
		{'name': 'Colorado', 'value': 'CO'},
		{'name': 'Connecticut', 'value': 'CT'},
		{'name': 'Delaware', 'value': 'DE'},
		{'name': 'District of Columbia', 'value': 'DC'},
		{'name': 'Florida', 'value': 'FL'},
		{'name': 'Georgia', 'value': 'GA'},
		{'name': 'Hawaii', 'value': 'HI'},
		{'name': 'Idaho', 'value': 'ID'},
		{'name': 'Illinois', 'value': 'IL'},
		{'name': 'Indiana', 'value': 'IN'},
		{'name': 'Iowa', 'value': 'IA'},
		{'name': 'Kansas', 'value': 'KS'},
		{'name': 'Kentucky', 'value': 'KY'},
		{'name': 'Louisiana', 'value': 'LA'},
		{'name': 'Maine', 'value': 'ME'},
		{'name': 'Maryland', 'value': 'MD'},
		{'name': 'Massachusetts', 'value': 'MA'},
		{'name': 'Michigan', 'value': 'MI'},
		{'name': 'Minnesota', 'value': 'MN'},
		{'name': 'Mississippi', 'value': 'MS'},
		{'name': 'Missouri', 'value': 'MO'},
		{'name': 'Montana', 'value': 'MT'},
		{'name': 'Nebraska', 'value': 'NE'},
		{'name': 'Nevada', 'value': 'NV'},
		{'name': 'New Hampshire', 'value': 'NH'},
		{'name': 'New Jersey', 'value': 'NJ'},
		{'name': 'New Mexico', 'value': 'NM'},
		{'name': 'New York', 'value': 'NY'},
		{'name': 'North Carolina', 'value': 'NC'},
		{'name': 'North Dakota', 'value': 'ND'},
		{'name': 'Ohio', 'value': 'OH'},
		{'name': 'Oklahoma', 'value': 'OK'},
		{'name': 'Oregon', 'value': 'OR'},
		{'name': 'Pennsylvania', 'value': 'PA'},
		{'name': 'Rhode Island', 'value': 'RI'},
		{'name': 'South Carolina', 'value': 'SC'},
		{'name': 'South Dakota', 'value': 'SD'},
		{'name': 'Tennessee', 'value': 'TN'},
		{'name': 'Texas', 'value': 'TX'},
		{'name': 'Utah', 'value': 'UT'},
		{'name': 'Vermont', 'value': 'VT'},
		{'name': 'Virginia', 'value': 'VA'},
		{'name': 'Washington', 'value': 'WA'},
		{'name': 'West Virginia', 'value': 'WV'},
		{'name': 'Wisconsin', 'value': 'WI'},
		{'name': 'Wyoming', 'value': 'WY'}
	];

	constructor(
		private accountHttpService: AccountHttpService,
		private formBuilder: FormBuilder,
		private confirmDialogService: ConfirmDialogService
	) {
		this.addressFormGroup = this.formBuilder.group({
			name: [{value: '', disabled: !this.isEditingAddressForm}, Validators.required],

			line1: [{value: '', disabled: !this.isEditingAddressForm}, Validators.required],
			line2: [{value: '', disabled: !this.isEditingAddressForm}],
			city: [{value: '', disabled: !this.isEditingAddressForm}, Validators.required],
			state: [{value: '', disabled: !this.isEditingAddressForm}, Validators.required],
			zip: [{value: '', disabled: !this.isEditingAddressForm}, Validators.required],
		});

		this.emailFormArray = this.formBuilder.array([]);
		this.phoneFormArray = this.formBuilder.array([]);
	}

	public ngOnInit(): void {
		this.accountHttpService.getAccount()
			.pipe(first())
			.subscribe((account) => {
				this.account = account;
				console.log(account);

				this.updateAddressFormValues();
				this.updateEmailFormValues();
				this.updatePhoneFormValues();
			});
	}

	//region Address Form

	private updateAddressFormValues(): void {
		this.addressFormGroup.get('name').setValue(this.account.clientName);
		this.addressFormGroup.get('line1').setValue(this.account.clientAddr);
		this.addressFormGroup.get('line2').setValue(this.account.clientAddr2);
		this.addressFormGroup.get('city').setValue(this.account.clientCity);
		this.addressFormGroup.get('state').setValue(this.account.clientState);
		this.addressFormGroup.get('zip').setValue(this.account.clientZip);
	}

	public addressFormSubmit(): void {
		const address = this.createAddressFormRequestBody();

		this.accountHttpService.editAccount(address)
			.pipe(first())
			.subscribe((account) => {
				this.account = account;
				this.updateAddressFormValues();

				this.isEditingAddressForm = false;
				this.addressFormGroup.disable();
				this.addressFormGroup.markAsPristine();
			});
	}

	private createAddressFormRequestBody(): Address {
		const address: Address = {};

		if (this.addressFormGroup.get('name').dirty) {
			address.clientName = this.addressFormGroup.get('name').value;
		}

		if (this.addressFormGroup.get('line1').dirty) {
			address.clientAddr = this.addressFormGroup.get('line1').value;
		}

		if (this.addressFormGroup.get('line2').dirty) {
			address.clientAddr2 = this.addressFormGroup.get('line2').value;
		}

		if (this.addressFormGroup.get('city').dirty) {
			address.clientCity = this.addressFormGroup.get('city').value;
		}

		if (this.addressFormGroup.get('state').dirty) {
			address.clientState = this.addressFormGroup.get('state').value;
		}

		if (this.addressFormGroup.get('zip').dirty) {
			address.clientZip = this.addressFormGroup.get('zip').value;
		}

		return address;
	}

	public addressFormCancel(): void {
		this.isEditingAddressForm = false;
		this.addressFormGroup.disable();
		this.addressFormGroup.reset({
			name: this.account.clientName,
			line1: this.account.clientAddr,
			line2: this.account.clientAddr2,
			city: this.account.clientCity,
			state: this.account.clientState,
			zip: this.account.clientZip
		});
	}

	public addressFormEdit(): void {
		this.isEditingAddressForm = true;
		this.addressFormGroup.enable();
	}

	//endregion

	//region Email Form

	private updateEmailFormValues(): void {
		for (const email of this.account.clientEmail) {
			const fg = this.formBuilder.group({
				emailAddress: [{value: email.emailAddress, disabled: !this.isEditingEmailForm}, [Validators.required, Validators.email]],
				name: [{value: email.name, disabled: !this.isEditingEmailForm}, Validators.required],
				emailPromos: [{value: email.emailPromos, disabled: !this.isEditingEmailForm}, Validators.required],
				emailReminders: [{value: email.emailReminders, disabled: !this.isEditingEmailForm}, Validators.required],
				emailStatements: [{value: email.emailStatements, disabled: !this.isEditingEmailForm}, Validators.required],
				emailVIP: [{value: email.emailThankYous, disabled: !this.isEditingEmailForm}, Validators.required]
			});
			this.emailFormArray.push(fg);
		}
	}

	public addEmailAddress(): void {
		const fg = this.formBuilder.group({
			emailAddress: [{value: '', disabled: !this.isEditingEmailForm}, [Validators.required, Validators.email]],
			name: [{value: '', disabled: !this.isEditingEmailForm}, Validators.required],
			emailPromos: [{value: true, disabled: !this.isEditingEmailForm}, Validators.required],
			emailReminders: [{value: true, disabled: !this.isEditingEmailForm}, Validators.required],
			emailStatements: [{value: true, disabled: !this.isEditingEmailForm}, Validators.required],
			emailVIP: [{value: true, disabled: !this.isEditingEmailForm}, Validators.required],
		});
		this.emailFormArray.push(fg);
	}

	public removeEmailAddress(index: number): void {
		if (this.emailFormArray.length === 1) {
			this.confirmDialogService.open(
				'Delete last email address?',
				`Deleting all email addresses will prevent you from being able to reset your password online.
				It may also impact our ability to contact you about any active work being done to your vehicles.`,
				'Delete',
				'Cancel'
				)
				.afterClosed()
				.pipe(
					first()
				)
				.subscribe((confirmed) => {
					if (confirmed) {
						this.emailFormArray.removeAt(index);
					}
				});
		} else {
			this.emailFormArray.removeAt(index);
		}
	}

	public emailFormSubmit(): void {
		const accountRequestBody = this.createEmailFormRequestBody();

		this.accountHttpService.editAccount(accountRequestBody)
			.pipe(first())
			.subscribe((accountResponse) => {
				this.account = accountResponse;
				this.resetEmailForm();
			});
	}

	private createEmailFormRequestBody(): AccountOverview {
		const emails: EmailAddress[] = this.emailFormArray.controls.map((control) => {
			return {
				emailAddress: control.get('emailAddress').value,
				name: control.get('name').value,
				emailPromos:  control.get('emailPromos').value,
				emailReminders:  control.get('emailReminders').value,
				emailStatements: control.get('emailStatements').value,
				emailThankYous: control.get('emailVIP').value
			} as EmailAddress;
		});

		return { clientEmail: emails } as AccountOverview;
	}

	public emailFormCancel(): void {
		this.resetEmailForm();
	}

	public emailFormEdit(): void {
		this.isEditingEmailForm = true;
		this.emailFormArray.enable();
	}

	private resetEmailForm(): void {
		this.isEditingEmailForm = false;

		this.emailFormArray.clear();
		this.updateEmailFormValues();
		this.emailFormArray.markAsPristine();
	}

	//endregion

	//region Phone Form

	private updatePhoneFormValues(): void {
		for (const phone of this.account.clientPhone) {
			const fg = this.formBuilder.group({
				phoneNumber: [
					{
						value: new TelephoneViewModel(
							phone.number.substring(0, 3),
							phone.number.substring(3, 6),
							phone.number.substring(6),
						),
						disabled: !this.isEditingPhoneForm
					},
					Validators.required
				],
				name: [{value: phone.name, disabled: !this.isEditingPhoneForm}, Validators.required],
				type: [{value: phone.type, disabled: !this.isEditingPhoneForm}, Validators.required],
				smsReminders: [{value: phone.smsReminders, disabled: !this.isEditingPhoneForm}, Validators.required],
				smsVIP: [{value: phone.smsThankYous, disabled: !this.isEditingPhoneForm}, Validators.required]
			});
			this.phoneFormArray.push(fg);
		}
	}

	public addPhoneNumber(): void {
		const fg = this.formBuilder.group({
			phoneNumber: [
				{
					value: new TelephoneViewModel(
						'',
						'',
						'',
					),
					disabled: !this.isEditingPhoneForm
				},
				Validators.required
			],
			name: [{value: '', disabled: !this.isEditingPhoneForm}, Validators.required],
			type: [{value: 'C', disabled: !this.isEditingPhoneForm}, Validators.required],
			smsReminders: [{value: true, disabled: !this.isEditingPhoneForm}, Validators.required],
			smsVIP: [{value: true, disabled: !this.isEditingPhoneForm}, Validators.required]
		});
		this.phoneFormArray.push(fg);
	}

	public removePhoneNumber(index: number): void {
		if (this.phoneFormArray.length === 1) {
			this.confirmDialogService.open(
				'Delete last phone number?',
				`Deleting all phone numbers may impact our ability to contact you
				about any active work being done to your vehicles.`,
				'Delete',
				'Cancel'
			)
				.afterClosed()
				.pipe(
					first()
				)
				.subscribe((confirmed) => {
					if (confirmed) {
						this.phoneFormArray.removeAt(index);
					}
				});
		} else {
			this.phoneFormArray.removeAt(index);
		}
	}

	public phoneFormSubmit(): void {
		const accountRequestBody = this.createPhoneFormRequestBody();

		this.accountHttpService.editAccount(accountRequestBody)
			.pipe(first())
			.subscribe((accountResponse) => {
				this.account = accountResponse;
				this.resetPhoneForm();
			});
	}

	private createPhoneFormRequestBody(): AccountOverview {
		const phoneNumbers: PhoneNumber[] = this.phoneFormArray.controls.map((control) => {
			const number = control.get('phoneNumber').value as TelephoneViewModel;
			return {
				number: '' + number.area + number.exchange + number.subscriber,
				name: control.get('name').value,
				type:  control.get('type').value,
				smsReminders:  control.get('smsReminders').value,
				smsThankYous: control.get('smsVIP').value
			} as PhoneNumber;
		});

		return { clientPhone: phoneNumbers } as AccountOverview;
	}

	public phoneFormCancel(): void {
		this.resetPhoneForm();
	}

	public phoneFormEdit(): void {
		this.isEditingPhoneForm = true;
		this.phoneFormArray.enable();
	}

	private resetPhoneForm(): void {
		this.isEditingPhoneForm = false;

		this.phoneFormArray.clear();
		this.updatePhoneFormValues();
		this.phoneFormArray.markAsPristine();
	}

	//endregion
}

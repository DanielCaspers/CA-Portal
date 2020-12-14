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
	public isEditingEmailForm: { [index: number]: boolean} = {};
	public isEditingPhoneForm: { [index: number]: boolean} = {};

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
		for (let i = 0; i < this.account.clientEmail.length; i++) {
			const email = this.account.clientEmail[i];
			const fg = this.formBuilder.group({
				emailAddress: [{value: email.emailAddress, disabled: !this.isEditingEmailForm[i]}, [Validators.required, Validators.email]],
				name: [{value: email.name, disabled: !this.isEditingEmailForm[i]}, Validators.required],
				emailPromos: [{value: email.emailPromos, disabled: !this.isEditingEmailForm[i]}, Validators.required],
				emailReminders: [{value: email.emailReminders, disabled: !this.isEditingEmailForm[i]}, Validators.required],
				emailStatements: [{value: email.emailStatements, disabled: !this.isEditingEmailForm[i]}, Validators.required],
				emailVIP: [{value: email.emailThankYous, disabled: !this.isEditingEmailForm[i]}, Validators.required]
			});
			this.emailFormArray.push(fg);
		}
	}

	public addEmailAddress(): void {
		const i = this.account.clientEmail.length;
		this.isEditingEmailForm[i] = true; // Add is an edit
		const fg = this.formBuilder.group({
			emailAddress: [{value: '', disabled: !this.isEditingEmailForm[i]}, [Validators.required, Validators.email]],
			name: [{value: '', disabled: !this.isEditingEmailForm[i]}, Validators.required],
			emailPromos: [{value: true, disabled: !this.isEditingEmailForm[i]}, Validators.required],
			emailReminders: [{value: true, disabled: !this.isEditingEmailForm[i]}, Validators.required],
			emailStatements: [{value: true, disabled: !this.isEditingEmailForm[i]}, Validators.required],
			emailVIP: [{value: true, disabled: !this.isEditingEmailForm[i]}, Validators.required],
		});
		this.emailFormArray.push(fg);
	}

	public removeEmailAddress(index: number): void {
		this.confirmDialogService.open(
			'Delete email address?',
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
					// For the API to succeed, we must preprocess the request to help the JSON patch algorithm
					// since the account API doesn't handle a null or empty array idiomatically as JSON merge patch RFC does.
					// At this point, the array length can only be >= 1.

					// If there will be more than one array entry after deletion, no special post processing need be done.
					// We can directly remove the value from the form, and then send an HTTP request reflecting the form state

					// If it's exactly one, the user is deleting the final email address.
					// In this case, we must send null for the email address, while leaving other fields untouched, which is a sentinel value
					// which instructs the API to clear out this array on our behalf.
					// After sending the HTTP request, it is then valid for us to remove it from the local form state, after the HTTP request is crafted.
					const numberOfItemsBeforeDelete = this.emailFormArray.length;

					if (numberOfItemsBeforeDelete > 1) {
						this.emailFormArray.removeAt(index);
					}
					const accountRequestBody = this.createEmailFormRequestBody(numberOfItemsBeforeDelete === 1);

					this.emailFormSubmit(index, accountRequestBody);

					if (numberOfItemsBeforeDelete === 1) {
						this.emailFormArray.removeAt(index);
					}
				}
			});
	}

	public emailFormSubmit(index: number, accountRequestBody: AccountOverview): void {
		this.accountHttpService.editAccount(accountRequestBody)
			.pipe(first())
			.subscribe((accountResponse) => {
				this.account = accountResponse;
				this.resetEmailForm(index);
			});
	}

	public createEmailFormRequestBody(removeFinalEmail: boolean = false): AccountOverview {
		const emails: EmailAddress[] = this.emailFormArray.controls.map((control) => {
			return {
				emailAddress: removeFinalEmail ? null : control.get('emailAddress').value,
				name: control.get('name').value,
				emailPromos:  control.get('emailPromos').value,
				emailReminders:  control.get('emailReminders').value,
				emailStatements: control.get('emailStatements').value,
				emailThankYous: control.get('emailVIP').value
			} as EmailAddress;
		});

		return { clientEmail: emails } as AccountOverview;
	}

	public emailFormCancel(index: number): void {
		this.resetEmailForm(index);
	}

	public emailFormEdit(index: number): void {
		this.isEditingEmailForm[index] = true;
		this.emailFormArray.at(index).enable();
	}

	private resetEmailForm(index: number): void {
		this.isEditingEmailForm[index] = false;

		this.emailFormArray.clear();
		this.updateEmailFormValues();
		this.emailFormArray.markAsPristine();
	}

	public isEditingEmail(): boolean {
		return Object.keys(this.isEditingEmailForm).some((key) => {
			return this.isEditingEmailForm[key] === true;
		});
	}

	public isEditingAnotherEmailForm(index: number): boolean {
		return Object.keys(this.isEditingEmailForm).some((key) => {
			// If looking at the current form, ignore the results.
			if (index === parseInt(key, 10)) {
				return false;
			} else {
				// If looking at another form, confirm whether or not they are editing.
				return this.isEditingEmailForm[key] === true;
			}
		});
	}

	//endregion

	//region Phone Form

	private updatePhoneFormValues(): void {
		for (let i = 0; i < this.account.clientPhone.length; i++) {
			const phone = this.account.clientPhone[i];
			const fg = this.formBuilder.group({
				phoneNumber: [
					{
						value: new TelephoneViewModel(
							phone.number.substring(0, 3),
							phone.number.substring(3, 6),
							phone.number.substring(6),
						),
						disabled: !this.isEditingPhoneForm[i]
					},
					Validators.required
				],
				name: [{value: phone.name, disabled: !this.isEditingPhoneForm[i]}, Validators.required],
				type: [{value: phone.type, disabled: !this.isEditingPhoneForm[i]}, Validators.required],
				smsReminders: [{value: phone.smsReminders, disabled: !this.isEditingPhoneForm[i]}, Validators.required],
				smsVIP: [{value: phone.smsThankYous, disabled: !this.isEditingPhoneForm[i]}, Validators.required]
			});
			this.phoneFormArray.push(fg);
		}
	}

	public addPhoneNumber(): void {
		const i = this.account.clientPhone.length;
		this.isEditingPhoneForm[i] = true; // Add is an edit
		const fg = this.formBuilder.group({
			phoneNumber: [
				{
					value: new TelephoneViewModel(
						'',
						'',
						'',
					),
					disabled: !this.isEditingPhoneForm[i]
				},
				Validators.required
			],
			name: [{value: '', disabled: !this.isEditingPhoneForm[i]}, Validators.required],
			type: [{value: 'C', disabled: !this.isEditingPhoneForm[i]}, Validators.required],
			smsReminders: [{value: true, disabled: !this.isEditingPhoneForm[i]}, Validators.required],
			smsVIP: [{value: true, disabled: !this.isEditingPhoneForm[i]}, Validators.required]
		});
		this.phoneFormArray.push(fg);
	}

	public removePhoneNumber(index: number): void {
		this.confirmDialogService.open(
			'Delete phone number?',
			`If you have any active work being done to your vehicles,
			deleting this phone number may impact our ability to contact you
			regarding it.`,
			'Delete',
			'Cancel'
		)
			.afterClosed()
			.pipe(
				first()
			)
			.subscribe((confirmed) => {
				if (confirmed) {
					// For the API to succeed, we must preprocess the request to help the JSON patch algorithm
					// since the account API doesn't handle a null or empty array idiomatically as JSON merge patch RFC does.
					// At this point, the array length can only be >= 1.

					// If there will be more than one array entry after deletion, no special post processing need be done.
					// We can directly remove the value from the form, and then send an HTTP request reflecting the form state

					// If it's exactly one, the user is deleting the final phone number.
					// In this case, we must send null for the phone number, while leaving other fields untouched, which is a sentinel value
					// which instructs the API to clear out this array on our behalf.
					// After sending the HTTP request, it is then valid for us to remove it from the local form state, after the HTTP request is crafted.
					const numberOfItemsBeforeDelete = this.phoneFormArray.length;

					if (numberOfItemsBeforeDelete > 1) {
						this.phoneFormArray.removeAt(index);
					}
					const accountRequestBody = this.createPhoneFormRequestBody(numberOfItemsBeforeDelete === 1);

					this.phoneFormSubmit(index, accountRequestBody);

					if (numberOfItemsBeforeDelete === 1) {
						this.phoneFormArray.removeAt(index);
					}
				}
			});
	}

	public phoneFormSubmit(index: number, accountRequestBody: AccountOverview): void {
		this.accountHttpService.editAccount(accountRequestBody)
			.pipe(first())
			.subscribe((accountResponse) => {
				this.account = accountResponse;
				this.resetPhoneForm(index);
			});
	}

	private createPhoneFormRequestBody(removeFinalPhone: boolean = false): AccountOverview {
		const phoneNumbers: PhoneNumber[] = this.phoneFormArray.controls.map((control) => {
			const number = control.get('phoneNumber').value as TelephoneViewModel;
			return {
				number: removeFinalPhone ? null : '' + number.area + number.exchange + number.subscriber,
				name: control.get('name').value,
				type:  control.get('type').value,
				smsReminders:  control.get('smsReminders').value,
				smsThankYous: control.get('smsVIP').value
			} as PhoneNumber;
		});

		return { clientPhone: phoneNumbers } as AccountOverview;
	}

	public phoneFormCancel(index: number): void {
		this.resetPhoneForm(index);
	}

	public phoneFormEdit(index: number): void {
		this.isEditingPhoneForm[index] = true;
		this.phoneFormArray.at(index).enable();
	}

	private resetPhoneForm(index: number): void {
		this.isEditingPhoneForm[index] = false;

		this.phoneFormArray.clear();
		this.updatePhoneFormValues();
		this.phoneFormArray.markAsPristine();
	}

	// Prevent all other phone forms from being edited while one is in progress.
	// Else, we break the encapsulation of singularity of edit
	// since saving the form will automatically push all
	// of these form fields to the server.
	public isEditingPhone(): boolean {
		return Object.keys(this.isEditingPhoneForm).some((key) => {
			return this.isEditingPhoneForm[key] === true;
		});
	}

	public isEditingAnotherPhoneForm(index: number): boolean {
		return Object.keys(this.isEditingPhoneForm).some((key) => {
			// If looking at the current form, ignore the results.
			if (index === parseInt(key, 10)) {
				return false;
			} else {
				// If looking at another form, confirm whether or not they are editing.
				return this.isEditingPhoneForm[key] === true;
			}
		});
	}

	//endregion

	//region Login form

	public changePassword(): void {
		window.confirm('This feature is coming soon.');
	}

	//endregion
}

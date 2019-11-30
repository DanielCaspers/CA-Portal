import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';

import { first } from 'rxjs/operators';

import { AccountOverview } from './account.models';
import { AccountHttpService } from './account-http.service';

@Component({
	selector: 'ma-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: [ './my-account.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class MyAccountComponent implements OnInit {

	public account: AccountOverview;
	public accountFormGroup: FormGroup;

	private isDisabled = true;

	constructor(
		private accountHttpService: AccountHttpService,
		private formBuilder: FormBuilder
	) {
		this.accountFormGroup = this.formBuilder.group({
			name: [{value: '', disabled: this.isDisabled}, Validators.required],

			line1: [{value: '', disabled: this.isDisabled}, Validators.required],
			line2: [{value: '', disabled: this.isDisabled}, Validators.required],
			city: [{value: '', disabled: this.isDisabled}, Validators.required],
			state: [{value: '', disabled: this.isDisabled}, Validators.required],
			zip: [{value: '', disabled: this.isDisabled}, Validators.required]
		});
	}

	public ngOnInit(): void {
		this.accountHttpService.getAccount()
			.pipe(first())
			.subscribe((account) => {
				this.account = account;
				console.debug(account);

				this.accountFormGroup.get('name').setValue(this.account.clientName);
				this.accountFormGroup.get('line1').setValue(this.account.clientAddr);
				this.accountFormGroup.get('line2').setValue(this.account.clientAddr2);
				this.accountFormGroup.get('city').setValue(this.account.clientCity);
				this.accountFormGroup.get('state').setValue(this.account.clientState);
				this.accountFormGroup.get('zip').setValue(this.account.clientZip);
			});
	}
}

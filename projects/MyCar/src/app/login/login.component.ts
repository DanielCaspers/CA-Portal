import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'ma-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {
	public showProgress = false;

	public loginForm: FormGroup = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	});

	constructor(private authService: AuthService, private router: Router) {
	}

	public submit() {
		this.showProgress = true;
		this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
			.pipe(first())
			.subscribe(
				result => {
					this.router.navigate(['/vehicles']);
				},
				err => {
					this.showProgress = false;
					this.loginForm.controls.password.setErrors({
						incorrect: true
					});
					console.error('Login failed', err)
				}
			);
	}
}

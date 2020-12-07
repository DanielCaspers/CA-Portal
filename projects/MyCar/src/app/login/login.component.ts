import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
	selector: 'ma-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
	public showProgress = false;

	constructor(private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute) {
	}

	public ngOnInit(): void {
		this.showProgress = true;
		const accessCode = this.activeRoute.snapshot.queryParamMap.get('access_code');
		this.authService.accessToken(accessCode)
			.pipe(first())
			.subscribe(
				(result) => {
					this.router.navigate(['/vehicles']);
				},
				(err) => {
					this.showProgress = false;
					console.error('Access code conversion to auth token failed. Navigating back to OAuth provider...', err);
					window.location.href = environment.oauthProviderUrl;
				}
			);
	}
}

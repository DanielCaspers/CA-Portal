import { NgModule } from '@angular/core';

import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { AuthTokenService } from './auth-token.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { LoginModule } from '../login/login.module';
import { JwtInterceptor } from './auth-token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function jwtOptionsFactory(authTokenService) {
	return {
		tokenGetter: () => authTokenService.authToken,
		whitelistedDomains: [environment.apiBaseUrl],
		// TODO DJC Auth blacklisted endpoints subject to change
		blacklistedRoutes: [
			`${environment.apiBaseUrl}/auth/logon`,
			`${environment.apiBaseUrl}/auth/token`
		]
	};
}

@NgModule({
	imports: [
		LoginModule,
		JwtModule.forRoot({
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtOptionsFactory,
				deps: [ AuthTokenService ]
			}
		}),
	],
	exports: [
		LoginModule
	],
	providers: [ AuthGuard, AuthService, AuthTokenService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
})
export class AuthModule {
}

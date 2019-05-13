import { NgModule } from '@angular/core';

import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { AuthTokenService } from './auth-token.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { LoginModule } from '../login/login.module';

export function jwtOptionsFactory(authTokenService) {
	return {
		tokenGetter: () => authTokenService.authToken,
		whitelistedDomains: [environment.apiBaseUrl],
		blacklistedRoutes: [`${environment.apiBaseUrl}${environment.authorizationUrl}`]
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
	providers: [ AuthGuard, AuthService, AuthTokenService ],
})
export class AuthModule {
}

import { InjectionToken, NgModule } from '@angular/core';
export const MA_HTTP_BASE_URL = new InjectionToken<string>('MaHttpBaseUrl');

@NgModule({
	providers: [
		{
			provide: MA_HTTP_BASE_URL,
			useValue: 'http://localhost:54343'
		}
	]
})
export class MaAppConfigModule {}
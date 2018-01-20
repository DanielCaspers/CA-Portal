import { InjectionToken, NgModule } from '@angular/core';
export const MA_HTTP_BASE_URL = new InjectionToken<string>('MaHttpBaseUrl');

@NgModule({
	providers: [
		{
			provide: MA_HTTP_BASE_URL,
			useValue: 'http://24.179.148.243/nightly-b'
			// useValue: 'http://localhost:54343'
		}
	]
})
export class MaAppConfigModule {}

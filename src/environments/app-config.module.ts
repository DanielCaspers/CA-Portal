import { InjectionToken, NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

export const MA_HTTP_BASE_URL = new InjectionToken<string>('MaHttpBaseUrl');
export const MA_HTTP_OPTIONS = new InjectionToken<string>('MaHttpOptions');
@NgModule({
	providers: [
		{
			provide: MA_HTTP_BASE_URL,
			useValue: 'https://di2.murphyauto.net'
			// useValue: 'http://24.179.148.243/nightly-b'
			// useValue: 'http://localhost:54343'
		},
		{
			provide: MA_HTTP_OPTIONS,
			useValue: {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*' })}
		}
	]
})
export class MaAppConfigModule {}

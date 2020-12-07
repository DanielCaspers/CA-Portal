// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { HttpHeaders } from '@angular/common/http';
import { MyCarEnvironment } from './environment.models';

const appKey = 'D4LgRtMpfyZKXBaYSgRzah6jBf3w7W0v';

export const environment: MyCarEnvironment = {
	production: false,
	apiBaseUrl: 'https://d3-devel.murphyauto.net/api/v2',
	oauthProviderUrl: `https://d3-devel.murphyauto.net/api/v2/auth/login?appkey=${appKey}`,
	httpOptions: {
		headers: new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH',
			// 'Access-Control-Allow-Headers': 'Authorization, x-appkey',

			'x-appkey': appKey
		})
	},
	googleAnalytics: {
		domain: 'none',
		trackingId: 'UA-140002525-1',
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

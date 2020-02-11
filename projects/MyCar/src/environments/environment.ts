// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { HttpHeaders } from '@angular/common/http';
import { MyCarEnvironment } from './environment.models';

export const environment: MyCarEnvironment = {
	production: false,
	apiBaseUrl: 'https://d3-devel.murphyauto.net/api/v2',
	invoiceServiceUrl: `https://d3api.murphyauto.net/showInv.php?invoice=`,
	httpOptions: {
		headers: new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			'x-appkey': 'D4LgRtMpfyZKXBaYSgRzah6jBf3w7W0v'
		})
	},
	authorizationUrl: '/auth/logon',
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

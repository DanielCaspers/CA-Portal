// TODO DJC Temporarily changing prod environment to staging for testing HTTP Delete feature issues for #50
import { HttpHeaders } from '@angular/common/http';
import { MyCarEnvironment } from './environment.models';

const appKey = 'DMVWA0V5Hb4J9zkezMEGEjxweyP2JivH';
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

// import { HttpHeaders } from '@angular/common/http';
// import { MyCarEnvironment } from './environment.models';
//
// const appKey = 'vngL2peLDHaT2XgHUyry8vYv5lezpAlj';
//
// export const environment: MyCarEnvironment = {
// 	production: true,
// 	apiBaseUrl: 'https://d3api.murphyauto.net/api/v2',
// 	oauthProviderUrl: `https://d3api.murphyauto.net/api/v2/auth/login?appkey=${appKey}`,
// 	httpOptions: {
// 		headers: new HttpHeaders({
// 			'Access-Control-Allow-Origin': '*',
// 			// 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH',
// 			// 'Access-Control-Allow-Headers': 'Authorization, x-appkey',
//
// 			'x-appkey': appKey
// 		})
// 	},
// 	googleAnalytics: {
// 		domain: 'auto',
// 		trackingId: 'UA-10667959-7'
// 	}
// };

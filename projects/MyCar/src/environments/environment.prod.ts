import { HttpHeaders } from '@angular/common/http';
import { MyCarEnvironment } from './environment.models';

export const environment: MyCarEnvironment = {
	production: true,
	apiBaseUrl: 'https://d3-devel.murphyauto.net/api/v2',
	invoiceServiceUrl: `https://d3api.murphyauto.net/showInv.php?invoice=`,
	httpOptions: {
		headers: new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH',
			// 'Access-Control-Allow-Headers': 'Authorization, x-appkey',

			'x-appkey': 'D4LgRtMpfyZKXBaYSgRzah6jBf3w7W0v'
		})
	},
	authorizationUrl: '/auth/login',
	googleAnalytics: {
		domain: 'auto',
		trackingId: 'UA-10667959-7'
	}
};

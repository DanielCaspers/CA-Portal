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
	authorizationUrl: '/auth/login',
	googleAnalytics: {
		domain: 'none',
		trackingId: 'UA-140002525-1',
	}
};

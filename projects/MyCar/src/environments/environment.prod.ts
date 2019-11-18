import { HttpHeaders } from '@angular/common/http';
import { MyCarEnvironment } from './environment.models';

export const environment: MyCarEnvironment = {
	production: true,
	apiBaseUrl: 'https://d3-devel.murphyauto.net/api/v2',
	httpOptions: {
		headers: new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			'x-appkey': 'D4LgRtMpfyZKXBaYSgRzah6jBf3w7W0v'
		})
	},
	authorizationUrl: '/auth/login'
};

import { HttpHeaders } from '@angular/common/http';
import { MyCarEnvironment } from './environment.models';

export const environment: MyCarEnvironment = {
	production: true,
	apiBaseUrl: 'https://d3-devel.murphyauto.net/api/v2',
	httpOptions: {
		headers: new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			'x-appkey': '82kkf452j2lL41430SpqFd6Dwe027zQ'
		})
	},
	authorizationUrl: '/auth/login'
};

import { HttpHeaders } from '@angular/common/http';
import { MaEnvironmentBase } from '../../../../environment.model';

export const environment: MaEnvironmentBase = {
	production: true,
	apiBaseUrl: 'https://di.murphyauto.net',
	httpOptions: { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) },
	googleAnalytics: {
		domain: 'auto',
		trackingId: 'UA-10667959-10'
	},
	features: {
		inspections: {
			includeUnknownCondition: false,
			displayMode: 'Public'
		}
	}
};

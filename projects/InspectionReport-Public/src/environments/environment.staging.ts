import { HttpHeaders } from '@angular/common/http';
import { MaEnvironmentBase } from '../../../../environment.model';

export const environment: MaEnvironmentBase = {
	production: false,
	apiBaseUrl: 'https://di2.murphyauto.net',
	httpOptions: { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) },
	googleAnalytics: {
		domain: 'none',
		trackingId: 'UA-140002525-1',
	},
	features: {
		inspections: {
			includeUnknownCondition: false,
			displayMode: 'Public'
		}
	}
};

import { HttpHeaders } from '@angular/common/http';

export const environment = {
	production: false,
	apiBaseUrl: 'https://di2.murphyauto.net',
	httpOptions: { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) }
};

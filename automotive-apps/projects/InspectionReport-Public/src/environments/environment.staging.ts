import { HttpHeaders } from '@angular/common/http';
import { MaEnvironment } from '../../../../environment.model';

export const environment: MaEnvironment = {
	production: false,
	apiBaseUrl: 'https://di2.murphyauto.net',
	httpOptions: { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) }
};

import { HttpHeaders } from '@angular/common/http';
import { MaEnvironment } from '../../../../environment.model';

export const environment: MaEnvironment = {
	production: false,
	apiBaseUrl: 'https://mycar.murphyauto.net',
	httpOptions: { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) }
};

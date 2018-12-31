import { HttpHeaders } from '@angular/common/http';
import { MaEnvironment } from '../../../../environment.model';

export const environment: MaEnvironment = {
	production: true,
	apiBaseUrl: 'https://mycar.murphyauto.net',
	httpOptions: { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) }
};

import { HttpHeaders } from '@angular/common/http';
import { MaEnvironmentBase } from '../../../../environment.model';

export const environment: MaEnvironmentBase = {
	production: true,
	apiBaseUrl: 'https://di.murphyauto.net',
	httpOptions: {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})}
};

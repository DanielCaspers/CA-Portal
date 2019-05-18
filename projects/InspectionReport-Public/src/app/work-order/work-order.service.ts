import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class WorkOrderService {

	constructor(private httpClient: HttpClient ) { }

	public getWorkOrder(inspectionId: string): Observable<any> {
		return this.httpClient.get(
			`${environment.apiBaseUrl}/WorkOrders/Json?inspectionId=${inspectionId}`,
			environment.httpOptions);
	}

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WorkOrderService {

	constructor(private httpClient: HttpClient ) { }

	public getWorkOrder(apiBaseUrl: string, inspectionId: string, httpOptions: { headers: HttpHeaders }): Observable<any> {
		return this.httpClient.get(`${apiBaseUrl}/WorkOrders/Json?inspectionId=${inspectionId}`, httpOptions);
	}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class InspectionHttpService {

	constructor(private httpClient: HttpClient ) { }

	public getInspectionReport(inspectionId: string, isGrouped: boolean): Observable<any> {
		return this.httpClient.get(
			`${environment.apiBaseUrl}/Inspections/Report?inspectionId=${inspectionId}&grouped=${isGrouped}`,
			environment.httpOptions);
	}

}

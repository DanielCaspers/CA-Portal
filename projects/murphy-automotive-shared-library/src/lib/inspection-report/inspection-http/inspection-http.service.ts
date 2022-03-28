import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InspectionHttpService {

	constructor(
		@Inject('ENVIRONMENT')
		private environment: any,
		private httpClient: HttpClient ) { }

	public getInspectionReport(inspectionId: string, isGrouped: boolean): Observable<any> {
		return this.httpClient.get(
			`${this.environment.apiBaseUrl}/Inspections/Report?inspectionId=${inspectionId}&grouped=${isGrouped}&includeUnknown=${this.environment.includeUnknownCondition}`,
			this.environment.httpOptions);
	}

}

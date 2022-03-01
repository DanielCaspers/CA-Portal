import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreInfo } from './store-info.models';

@Injectable()
export class StoreInfoService {

	private storeInfoSubject: Subject<any> = new Subject();

	constructor(private httpClient: HttpClient) { }

	public getStoreInfo(apiBaseUrl: string, companyNumber: string, httpOptions: { headers: HttpHeaders}): Observable<StoreInfo> {
		return this.httpClient.get<StoreInfo>(`${apiBaseUrl}/StoreInfo/Json?companyNumber=${companyNumber}`, httpOptions)
			.pipe(
				map(storeInfo => {
					this.storeInfoSubject.next(storeInfo);
					return storeInfo;
				})
			);
	}

	public get storeInfo$(): Observable<StoreInfo> {
		return this.storeInfoSubject;
	}
}

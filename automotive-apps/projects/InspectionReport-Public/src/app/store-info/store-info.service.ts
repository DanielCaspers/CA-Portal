import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StoreInfo } from './store-info.models';

@Injectable()
export class StoreInfoService {

	private storeInfoSubject: Subject<any> = new Subject();

	constructor(private httpClient: HttpClient ) { }

	public getStoreInfo(companyNumber: string): Observable<StoreInfo> {
		return this.httpClient.get<StoreInfo>(
			`${environment.apiBaseUrl}/StoreInfo/Json?companyNumber=${companyNumber}`,
			environment.httpOptions
			)
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

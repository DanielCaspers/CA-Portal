import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { MA_HTTP_BASE_URL, MA_HTTP_OPTIONS } from '../../environments/app-config.module';
import { StoreInfo } from './store-info.models';

@Injectable()
export class StoreInfoService {

	private storeInfoSubject: Subject<any> = new Subject();

	constructor(
		private httpClient: HttpClient,
		@Inject(MA_HTTP_BASE_URL) private readonly baseUrl,
		@Inject(MA_HTTP_OPTIONS) private readonly httpOptions ) { }

	public getStoreInfo(companyNumber: string): Observable<StoreInfo> {
		return this.httpClient.get<StoreInfo>(
			`${this.baseUrl}/StoreInfo/Json?companyNumber=${companyNumber}`,
			{headers: this.httpOptions.headers}
			).pipe(
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

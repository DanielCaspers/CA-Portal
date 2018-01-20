import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { MA_HTTP_BASE_URL } from '../../../environments/app-config.module';
import { StoreInfo } from './store-info.models';

@Injectable()
export class StoreInfoService {

	private storeInfoSubject: Subject<any> = new Subject();

	constructor(private httpClient: HttpClient, @Inject(MA_HTTP_BASE_URL) private readonly baseUrl ) { }

	public getStoreInfo(companyNumber: string): Observable<StoreInfo> {
		return this.httpClient.get<StoreInfo>(
			`${this.baseUrl}/StoreInfo/Json?companyNumber=${companyNumber}`,
			{headers: new HttpHeaders({'Access-Control-Allow-Origin': '*' })}
			).map(storeInfo => {
				this.storeInfoSubject.next(storeInfo);
				return storeInfo;
		});
	}

	public get storeInfo$(): Observable<StoreInfo> {
		return this.storeInfoSubject;
	}
}

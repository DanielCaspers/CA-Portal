import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MA_HTTP_BASE_URL } from '../../../environments/app-config.module';

@Injectable()
export class WorkOrderService {

	constructor(private httpClient: HttpClient, @Inject(MA_HTTP_BASE_URL) private readonly baseUrl ) { }

	public getWorkOrder(workOrderId = '004584155'): Observable<any> {
		return this.httpClient.get(
			`${this.baseUrl}/WorkOrders/Json?workOrderId=${workOrderId}`,
			{headers: new HttpHeaders({'Access-Control-Allow-Origin': '*' })}
			);
		//
		// let obs = {"Id":"004584155","EmployeeId":"0","ServiceAdvisor":"","BillingSummary":["Synthetic Oil Change 4x4","Qty:5.1 - 0w20SYNB 0w20 Thrive Synthetic Oil (Dexos)","Qty:1 - R1365 OIL FILTER",""],"TotalBill":"48.80","WorkDescription":["LUBE, OIL, FILTER","SYNsyn"],"Date":"\/Date(1500094800000)\/","ScheduleDate":"\/Date(1500094800000)\/","CompletionDate":null,"Status":{"Code":0,"Description":"Initiated","Timestamp":1500144733,"Misc":"P52"},"Customer":{"Id":"042925","Name":"Andrew Schafer","Address":{"Line1":"15734 Fremont Way","Line2":"","City":"Apple Valley ","State":"MN","ZIP":"55124-6531"},"PhoneNumbers":[{"Number":"6123561182","ContactName":"ANDREW","Type":"C","SMSPreferences":""}],"Notes":[""]},"Vehicle":{"VIN":"5N1AZ2MH6FN238531","Year":2015,"Make":"Nissan","Model":"Murano","Color":"Blue","License":"392-TBN","Transmission":"Auto","Engine":"3.5","Odometer":35217,"Notes":["Shjhf"]},"RecommendedServices":[{"Id":"1799636771A","Description":"AIR FILTER NEEDED NEXT SERVICE","OrderId":"","LastModifiedDate":"\/Date(1491627600000)\/","TechnicianId":"0030","AppLink":"","EstimateId":"","NotificationCount":1,"Severity":2,"IsCustomerConcern":false}]};
		//
		// return Observable.of(obs);
	}

}
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MA_HTTP_BASE_URL } from '../../environments/app-config.module';

@Injectable()
export class InspectionService {

	constructor(private httpClient: HttpClient, @Inject(MA_HTTP_BASE_URL) private readonly baseUrl ) { }

	public getInspectionReport(workOrderId = '004584155'): Observable<any> {
		return this.httpClient.get(
			`${this.baseUrl}/Inspections/Report?workOrderId=${workOrderId}`,
			{headers: new HttpHeaders({'Access-Control-Allow-Origin': '*' })}
			);
		// let obs =
		// 	{"WorkOrder":{"Id":"004584155","EmployeeId":"0","ServiceAdvisor":"","BillingSummary":["Synthetic Oil Change 4x4","Qty:5.1 - 0w20SYNB 0w20 Thrive Synthetic Oil (Dexos)","Qty:1 - R1365 OIL FILTER",""],"TotalBill":"48.80","WorkDescription":["LUBE, OIL, FILTER","SYNsyn"],"Date":"\/Date(1500094800000)\/","ScheduleDate":"\/Date(1500094800000)\/","CompletionDate":null,"Status":{"Code":0,"Description":"Initiated","Timestamp":1500144733,"Misc":"P52"},"Customer":{"Id":"042925","Name":"Andrew Schafer","Address":{"Line1":"15734 Fremont Way","Line2":"","City":"Apple Valley ","State":"MN","ZIP":"55124-6531"},"PhoneNumbers":[{"Number":"6123561182","ContactName":"ANDREW","Type":"C","SMSPreferences":""}],"Notes":[""]},"Vehicle":{"VIN":"5N1AZ2MH6FN238531","Year":2015,"Make":"Nissan","Model":"Murano","Color":"Blue","License":"392-TBN","Transmission":"Auto","Engine":"3.5","Odometer":35217,"Notes":["Shjhf"]},"RecommendedServices":[{"Id":"1799636771A","Description":"AIR FILTER NEEDED NEXT SERVICE","OrderId":"","LastModifiedDate":"\/Date(1491627600000)\/","TechnicianId":"0030","AppLink":"","EstimateId":"","NotificationCount":1,"Severity":2,"IsCustomerConcern":false}]},"InspectionReportItems":[{"Condition":1,"Note":"We see this tire wear commonly on this generation of your Murano because of premature wear in suspension components. It might also be worth considering struts in the near future. ","Name":"Front Tires","CannedResponses":[{"Response":"Uneven wear","Description":null,"Url":"https://static.wixstatic.com/media/4bdb4c_f39c3b14a1ea4bf3ae72b85f5f21e7b1~mv2.gif"},{"Response":"Tread Depth Below 3/32nds","Description":"When minimal tread is remaining, it can be unsafe to drive. Especially in winter. ","Url":null}],"Measurements":[{"Value":0,"Label":"Tread Depth","Unit":"32nds inch"},{"Value":0,"Label":"Pressure","Unit":"PSI"},{"Value":10,"Label":"Tread Depth","Unit":"32nds inch"},{"Value":36,"Label":"Pressure","Unit":"PSI"},{"Value":0,"Label":"Tread Depth","Unit":"32nds inch"},{"Value":0,"Label":"Pressure","Unit":"PSI"}],"Images":[{"title":"Front Tires","altText":"Front Tires","url":"http://localhost:54343/Uploads/Inspections/004584155/d0c763ee-719d-4f04-becd-8f1679b24917/8f40880e-c4ae-414d-ac7b-27dc122bfcb6_9911ecbea07a30e7c89fdadbe8a058e8_L.jpg"},{"title":"Front Tires","altText":"Front Tires","url":"http://localhost:54343/Uploads/Inspections/004584155/d0c763ee-719d-4f04-becd-8f1679b24917/07248c5e-ecd2-4e8b-977f-1d6147bfef9e_CHECKLIST.jpg"}]},{"Condition":2,"Note":"We noticed water in the headlight enclosure. This could eventually lead to a broken headlight, or other electrical issues. ","Name":"Headlights","CannedResponses":[],"Measurements":[],"Images":[{"title":"Headlights","altText":"Headlights","url":"http://localhost:54343/Uploads/Inspections/004584155/39e1c6c8-cd3d-429c-8b67-58a8b1244f51/faa99354-1e8f-401a-aebd-49c72f29748d_FerrariF40_5.JPG"}]},{"Condition":2,"Note":"asddasfadsfsdf","Name":"Oil","CannedResponses":[{"Response":"Contaminated","Description":null,"Url":null},{"Response":"Oil burnt","Description":null,"Url":null}],"Measurements":[{"Value":0,"Label":"Contamination","Unit":"PPM"},{"Value":40,"Label":"Contamination","Unit":"PPM"}],"Images":[]},{"Condition":3,"Note":null,"Name":"Tire Tread Depth","CannedResponses":[{"Response":"Unsafe tread","Description":null,"Url":null}],"Measurements":[],"Images":[{"title":"Tire Tread Depth","altText":"Tire Tread Depth","url":"http://localhost:54343/Uploads/Inspections/004584155/dd17bd28-d718-42eb-ba7b-0a9e4f963957/68f4dc28-108d-42ed-a086-34616e6e93fe_CHECKLIST2.jpg"}]},{"Condition":5,"Note":null,"Name":"Windshield Wipers / Resevior","CannedResponses":[],"Measurements":[],"Images":[{"title":"Windshield Wipers / Resevior","altText":"Windshield Wipers / Resevior","url":"http://localhost:54343/Uploads/Inspections/004584155/0b4a54b6-4b57-4972-9210-b4269ffc7129/08738ad0-ea5e-4204-863c-c8800b7e9b90_wiper.jpg"}]}]}
		// 	;
		// return Observable.of(obs);
	}

}
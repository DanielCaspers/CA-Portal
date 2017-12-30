import { Component, Input } from '@angular/core';

@Component({
	selector: 'ma-inspection-report-group',
	templateUrl: './inspection-report-group.component.html',
	styleUrls: [ './inspection-report-group.component.scss' ]
})
export class InspectionReportGroupComponent {

	@Input()
	public inspectionGroup = {
		severity: 'Moderate',
		name: 'Tires'
	};

	public inspectionItem = {
		severity: 'Moderate',
		name: 'Front Tires',
		measurements: [
			{ name: 'Tread Depth', value: '3', unit: '32nds inch' },
			{ name: 'Engine Operating Temperature', value: '190', unit: '°F' }
		],
		cannedResponses: [
			{
				description: 'Some long piece of help content to explain why there car is a certain way',
				url: 'http://murphyauto.com'
			}
		],
		notes: 'A hand crafted this message to speak directly to the exact scenario found on the car.'
	};

	public inspectionItem2 = {
		severity: 'Maintenance',
		name: 'Rear Tires',
		measurements: [
			{ name: 'Tread Depth', value: '3', unit: '32nds inch' },
			{ name: 'Engine Operating Temperature', value: '190', unit: '°F' }
		],
		cannedResponses: [
			{
				description: 'Some long piece of help content to explain why there car is a certain way',
				url: 'http://murphyauto.com'
			}
		],
		notes: 'A hand crafted this message to speak directly to the exact scenario found on the car.'
	};

	constructor() {
	}

}

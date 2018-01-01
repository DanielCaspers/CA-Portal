import { Component, Input } from '@angular/core';

@Component({
	selector: 'ma-inspection-report-group',
	templateUrl: './inspection-report-group.component.html',
	styleUrls: [ './inspection-report-group.component.scss' ]
})
export class InspectionReportGroupComponent {

	@Input()
	public inspectionGroup = {
		Condition: 1,
		Name: 'Tires'
	};

	@Input()
	public inspectionItems: any[] = [];

	constructor() {
	}

}

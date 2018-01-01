import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../../inspection.service';

@Component({
	selector: 'ma-inspection-report',
	templateUrl: './inspection-report.component.html',
	styleUrls: [ './inspection-report.component.scss' ]
})
export class InspectionReportComponent implements OnInit {

	public inspectionItems;

	public ig1 = {
		Condition: 3,
		Name: 'Under Hood'
	};

	public ig2 = {
		Condition: 5,
		Name: 'Brakes'
	};

	constructor(private inspectionService: InspectionService) {
	}

	public ngOnInit(): void {
		this.inspectionService.getInspectionReport()
			.subscribe((response) => {
				this.inspectionItems = response.InspectionReportItems;
				console.log('My inspection items', this.inspectionItems);
			});
	}

}

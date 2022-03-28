import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import filter from 'lodash-es/filter';
import sortBy from 'lodash-es/sortBy';

@Component({
	selector: 'ma-inspection-report-customer-concerns',
	templateUrl: './inspection-report-customer-concerns.component.html',
	styleUrls: [ './inspection-report-customer-concerns.component.scss' ]
})
export class InspectionReportCustomerConcernsComponent implements OnChanges {
	@Input()
	public inspectionItems = [];

	constructor() { }

	public ngOnChanges(changeObj: SimpleChanges): void {
		if (changeObj && !!changeObj.inspectionItems.currentValue) {
			this.inspectionItems =
				sortBy(
					filter(this.inspectionItems, ['IsCustomerConcern', true]),
					['Condition', 'Name']
				);
		}
	}
}

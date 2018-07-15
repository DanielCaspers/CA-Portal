import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import filter from 'lodash-es/filter';

@Component({
	selector: 'ma-inspection-customer-concerns',
	templateUrl: './inspection-customer-concerns.component.html',
	styleUrls: [ './inspection-customer-concerns.component.scss' ]
})
export class InspectionCustomerConcernsComponent implements OnChanges {
	@Input()
	public inspectionItems;

	public customerConcernInspectionItems;

	constructor() { }

	public ngOnChanges(changeObj: SimpleChanges): void {
		if (changeObj && !!changeObj.inspectionItems.currentValue) {
			this.customerConcernInspectionItems = filter(this.inspectionItems, ['IsCustomerConcern', true]);
		}
	}
}

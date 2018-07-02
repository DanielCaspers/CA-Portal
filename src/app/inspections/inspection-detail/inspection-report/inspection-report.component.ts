import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import filter from 'lodash-es/filter';
import reduce from 'lodash-es/reduce';
import sortBy from 'lodash-es/sortBy';
import { InspectionService } from '../../inspection.service';

@Component({
	selector: 'ma-inspection-report',
	templateUrl: './inspection-report.component.html',
	styleUrls: [ './inspection-report.component.scss' ]
})
export class InspectionReportComponent implements OnInit {

	public inspectionGroups;
	public customerConcernInspectionItems;
	public inspectionId: string;

	constructor(private inspectionService: InspectionService, private route: ActivatedRoute) {
	}

	public ngOnInit(): void {
		this.route.parent.params.subscribe((params) => {
			this.inspectionId = params.id;

			const sub = this.inspectionService.getInspectionReport(this.inspectionId, true)
				.subscribe((response) => {
					sub.unsubscribe();
					this.inspectionGroups = response;

					this.customerConcernInspectionItems =
						// Accumulate all of the grouped items into a flattened array
						reduce(this.inspectionGroups, (result, ig, key) => {
							return result.concat(ig.Items);
						}, []);

					this.customerConcernInspectionItems =
						sortBy(
							filter(this.customerConcernInspectionItems, ['IsCustomerConcern', true]),
							['Condition', 'Name']
						);
				});
		});
	}

	public shouldExpand(item): boolean {
		return (item.Measurements && item.Measurements.length > 0) ||
			(item.CannedResponses && item.CannedResponses.length > 0) ||
			(item.Images && item.Images.length > 0) ||
			!!item.Note;
	}

}

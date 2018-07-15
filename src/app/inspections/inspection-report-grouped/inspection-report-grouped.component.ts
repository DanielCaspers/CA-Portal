import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import filter from 'lodash-es/filter';
import reduce from 'lodash-es/reduce';
import sortBy from 'lodash-es/sortBy';

import { InspectionHttpService } from '../inspection-http.service';

@Component({
	selector: 'ma-inspection-report-grouped',
	templateUrl: './inspection-report-grouped.component.html',
	styleUrls: [ './inspection-report-grouped.component.scss' ]
})
export class InspectionReportGroupedComponent implements OnInit {

	public inspectionGroups;
	public inspectionId: string;

	public customerConcernInspectionItems;

	constructor(private inspectionService: InspectionHttpService, private route: ActivatedRoute) {
	}

	public ngOnInit(): void {
		this.route.parent.params.subscribe((params) => {
			this.inspectionId = params.id;

			console.log('ID is', this.inspectionId);

			this.inspectionService.getInspectionReport(this.inspectionId, true)
				.subscribe((response) => {
					this.inspectionGroups = response;

					// Add client-side state to the group response model so that each group, when expanded,
					// will hold its own client side expansion state independent of other groups.
					// This state is used for toggling on/off the group's overall condition
					for (let group of this.inspectionGroups) {
						group.IsExpanded = false;
					}

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

}

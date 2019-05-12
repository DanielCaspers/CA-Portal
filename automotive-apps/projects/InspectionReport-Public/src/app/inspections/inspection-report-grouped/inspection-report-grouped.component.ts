import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import filter from 'lodash-es/filter';
import reduce from 'lodash-es/reduce';
import sortBy from 'lodash-es/sortBy';
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';

import { InspectionHttpService } from '../inspection-http.service';
import { InspectionReportItemContainerComponent } from '../inspection-report-item-container/inspection-report-item-container-component';

@Component({
	selector: 'ma-inspection-report-grouped',
	templateUrl: './inspection-report-grouped.component.html',
	styleUrls: [ './inspection-report-grouped.component.scss' ]
})
export class InspectionReportGroupedComponent extends InspectionReportItemContainerComponent implements OnInit {

	public inspectionGroups;
	public customerConcernInspectionItems;
	public inspectionId: string;

	constructor(
		private inspectionService: InspectionHttpService,
		private route: ActivatedRoute,
		googleAnalyticsService: NgxAnalyticsGoogleAnalytics) {
		super(googleAnalyticsService);
	}

	public ngOnInit(): void {
		this.route.parent.params.subscribe((params) => {
			this.inspectionId = params.id;

			const sub = this.inspectionService.getInspectionReport(this.inspectionId, true)
				.subscribe((response) => {
					sub.unsubscribe();
					this.inspectionGroups = response;

					// Add client-side state to the group response model so that each group, when expanded,
					// will hold its own client side expansion state independent of other groups.
					// This state is used for toggling on/off the group's overall condition
					for (const group of this.inspectionGroups) {
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

	public onCollapse(inspectionGroup): void {
		super.onCollapse(inspectionGroup.Name, 'InspectionItemGroup');
		inspectionGroup.IsExpanded = false;
	}

	public onExpand(inspectionGroup): void {
		super.onCollapse(inspectionGroup.Name, 'InspectionItemGroup');
		inspectionGroup.IsExpanded = true;
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { first } from 'rxjs/operators';

import { InspectionHttpService } from '../inspection-http/inspection-http.service';
import { InspectionReportItemContainerComponent } from '../inspection-report-item-container/inspection-report-item-container-component';

@Component({
	selector: 'ma-inspection-report-grouped',
	templateUrl: './inspection-report-grouped.component.html',
	styleUrls: [ './inspection-report-grouped.component.scss' ]
})
export class InspectionReportGroupedComponent extends InspectionReportItemContainerComponent implements OnInit {

	public collapsedPanelHeight: string;
	public expandedPanelHeight: string;

	public inspectionGroups;
	public inspectionId: string;

	constructor(
		private inspectionService: InspectionHttpService,
		private route: ActivatedRoute,
		// googleAnalyticsService: NgxAnalyticsGoogleAnalytics
	) {
		super(/*googleAnalyticsService*/);
	}

	public ngOnInit(): void {
		this.route.data
			.pipe(
				first()
			)
			.subscribe((data) => {
				this.collapsedPanelHeight = data.collapsedHeight;
				this.expandedPanelHeight = data.expandedHeight;
			});

		this.route.parent.params.subscribe((params) => {
			this.inspectionId = params.id;

			this.inspectionService.getInspectionReport(this.inspectionId, true)
				.pipe(
					first()
				)
				.subscribe((response) => {
					this.inspectionGroups = response;

					// Add client-side state to the group response model so that each group, when expanded,
					// will hold its own client side expansion state independent of other groups.
					// This state is used for toggling on/off the group's overall condition
					for (const group of this.inspectionGroups) {
						group.IsExpanded = false;
					}
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

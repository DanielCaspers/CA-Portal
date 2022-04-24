import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { first } from 'rxjs/operators';

import { InspectionHttpService } from '../inspection-http/inspection-http.service';
import { InspectionReportItemContainerComponent } from '../inspection-report-item-container/inspection-report-item-container-component';

@Component({
	selector: 'ma-inspection-report-item-list',
	templateUrl: './inspection-report-item-list.component.html',
	styleUrls: [ './inspection-report-item-list.component.scss' ]
})
export class InspectionReportItemListComponent extends InspectionReportItemContainerComponent implements OnInit {

	public inspectionItems;
	public inspectionId: string;

	public displayMode: 'default' | 'flat' = 'default';
	public multi = true;

	constructor(
		private inspectionService: InspectionHttpService,
		private route: ActivatedRoute,
		// googleAnalyticsService: NgxAnalyticsGoogleAnalytics
	) {
		super(/*googleAnalyticsService */);
	}

	public ngOnInit(): void {
		this.route.data
			.pipe(
				first()
			)
			.subscribe((data) => {
				this.displayMode = data.displayMode;
				this.multi = data.multi;
			});

		this.route.parent.params.subscribe((params) => {
			this.inspectionId = params.id;

			console.log('ID is', this.inspectionId);

			this.inspectionService.getInspectionReport(this.inspectionId, false)
				.pipe(
					first()
				)
				.subscribe((response) => {
					this.inspectionItems = response;
				});
		});
	}
}

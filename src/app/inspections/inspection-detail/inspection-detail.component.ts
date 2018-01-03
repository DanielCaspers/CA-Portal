import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { InspectionService } from '../inspection.service';

@Component({
	selector: 'ma-inspection-detail',
	templateUrl: './inspection-detail.component.html',
	styleUrls: [ './inspection-detail.component.scss' ]
})
export class InspectionDetailComponent implements OnDestroy, OnInit {
	public inspectionId: string = null;
	public routeLinks;
	public workOrder = null;

	private activeLinkIndex = 0;
	private routerSubscription;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private inspectionService: InspectionService) {
	}

	public ngOnInit(): void {
		this.routerSubscription = this.router.events
			.filter(event => event instanceof NavigationEnd)
			.subscribe(() => {
				this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === this.router.url));
			});

		this.route.params.subscribe(params => {
			this.inspectionId = params.id;

			this.routeLinks = [
				{
					label: 'Grouped',
					link: `/inspections/${this.inspectionId}/report`,
					index: 0
				},
				{
					label: 'Individual',
					link: `/inspections/${this.inspectionId}/table`,
					index: 1
				}
			];

			this.inspectionService.getInspectionReport(this.inspectionId)
				.subscribe((response) => {
					this.workOrder = response.WorkOrder;
				});
		});

	}

	public ngOnDestroy(): void {
		this.routerSubscription.unsubscribe();
	}

}

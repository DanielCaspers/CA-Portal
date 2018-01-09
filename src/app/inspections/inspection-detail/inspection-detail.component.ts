import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { WorkOrderService } from '../../shared';

interface IInspectionRouteLink {
	label: string;
	link: string;
	isActive: boolean;
}

@Component({
	selector: 'ma-inspection-detail',
	templateUrl: './inspection-detail.component.html',
	styleUrls: [ './inspection-detail.component.scss' ]
})
export class InspectionDetailComponent implements OnDestroy, OnInit {
	public inspectionId: string = null;
	public routeLinks: IInspectionRouteLink[];
	public workOrder = null;

	private routeParamsSubscription: Subscription;
	private routerSubscription: Subscription;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private workOrderService: WorkOrderService) {
	}

	public ngOnInit(): void {
		this.routeParamsSubscription = this.route.params.subscribe(params => {
			this.inspectionId = params.id;

			this.routeLinks = [
				{
					label: 'By area',
					link: `/inspections/${this.inspectionId}/report`,
					isActive: false
				},
				{
					label: 'By priority',
					link: `/inspections/${this.inspectionId}/table`,
					isActive: false
				}
			];

			this.updateActiveTab();

			this.workOrderService.getWorkOrder(this.inspectionId)
				.subscribe((response) => {
					this.workOrder = response;
				});
		});

		this.routerSubscription = this.router.events
			.filter(event => event instanceof NavigationEnd)
			.subscribe(() => {
				this.updateActiveTab();
			});
	}

	public ngOnDestroy(): void {
		this.routeParamsSubscription.unsubscribe();
		this.routerSubscription.unsubscribe();
	}

	public get activeRoute(): IInspectionRouteLink {
		return this.routeLinks.find(tab => tab.isActive);
	}

	private updateActiveTab(): void {
		this.routeLinks.forEach(tab => tab.isActive = (tab.link === this.router.url));
	}

}

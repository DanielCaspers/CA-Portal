import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { StoreInfoService } from '../../store-info/store-info.service';
import { WorkOrderService } from '../../work-order/work-order.service';

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
	private storeInfoSubscription: Subscription;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public storeInfoService: StoreInfoService,
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
					link: `/inspections/${this.inspectionId}/priority`,
					isActive: false
				}
			];

			this.updateActiveTab();

			this.workOrderService.getWorkOrder(this.inspectionId)
				.subscribe((response) => {
					this.workOrder = response;
					// Store Info service passes info to core view, who doesn't have route parameter
					this.storeInfoSubscription = this.storeInfoService.getStoreInfo(this.workOrder.Id.substring(0, 3))
						.subscribe(() => {});
				});

		});

		this.routerSubscription = this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd)
			)
			.subscribe(() => {
				this.updateActiveTab();
			});
	}

	public ngOnDestroy(): void {
		this.routeParamsSubscription.unsubscribe();
		this.routerSubscription.unsubscribe();
		this.storeInfoSubscription.unsubscribe();
	}

	public get activeRoute(): IInspectionRouteLink {
		return this.routeLinks.find(tab => tab.isActive);
	}

	private updateActiveTab(): void {
		this.routeLinks.forEach(tab => tab.isActive = (tab.link === this.router.url));
	}

}

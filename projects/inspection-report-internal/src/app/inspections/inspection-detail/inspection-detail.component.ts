import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
// import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { StoreInfoService, WorkOrderService, InspectionHttpService } from 'murphy-automotive-shared-library';
import { environment } from '../../../environments/environment';

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
export class InspectionDetailComponent implements OnDestroy, OnInit, AfterViewInit {
	public inspectionId: string = null;
	public inspectionItems;
	public routeLinks: IInspectionRouteLink[];
	public workOrder = null;

	private routeParamsSubscription: Subscription;
	private routerSubscription: Subscription;
	private storeInfoSubscription: Subscription;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private inspectionService: InspectionHttpService,
		public storeInfoService: StoreInfoService,
		private workOrderService: WorkOrderService,
		// private googleAnalyticsService: NgxAnalyticsGoogleAnalytics,
		@Inject('WINDOW') private window: any) {
	}

	public ngOnInit(): void {
		this.routeParamsSubscription = this.route.params.subscribe(this.onRouteChanged.bind(this));

		this.routerSubscription = this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd)
			)
			.subscribe(() => {
				this.updateActiveTab();
			});

		this.getInspectionReport();
	}


	public ngAfterViewInit(): void {
		// Separated from ngOnInit() logic due to incompatabilities with Google Analytics and build time optimization
		// https://stackoverflow.com/questions/45241131/angular-and-google-analytics-integration-ga-is-not-a-function
		if (!!this.workOrder && !!this.workOrder.Id) {
			const companyNumber = this.workOrder.Id.substring(0, 3);
			// this.googleAnalyticsService.setUsername(this.workOrder.Id);

			this.window.ga('set', {
				'dimension6': companyNumber,
				'dimension3': this.workOrder.Vehicle.Year,
				'dimension4': this.workOrder.Vehicle.Make,
				'dimension5': this.workOrder.Vehicle.Model,
				'dimension2': this.workOrder.Vehicle.Odometer,
				'dimension7': this.workOrder.Id
			});

			this.storeInfoSubscription =
				this.storeInfoService.getStoreInfo(environment.apiBaseUrl, companyNumber, environment.httpOptions)
					.subscribe(() => {});
		}
	}

	public ngOnDestroy(): void {
		this.routeParamsSubscription.unsubscribe();
		this.routerSubscription.unsubscribe();
		this.storeInfoSubscription.unsubscribe();
	}

	public get activeRoute(): IInspectionRouteLink {
		return this.routeLinks.find(tab => tab.isActive);
	}

	private onRouteChanged(params: Params): void {
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

		this.workOrderService.getWorkOrder(environment.apiBaseUrl, this.inspectionId, environment.httpOptions)
			.subscribe((response) => {
				this.workOrder = response;
				// Store Info service passes info to core view, who doesn't have route parameter

				// TODO DJC Determine if this works appropriately once deployed to remote
				// this.googleAnalyticsService.setUsername('004123456');
				// this.googleAnalyticsService.setUserProperties({
				// 	'Checklist Item': undefined,
				// 	'Company Number': '004',
				// 	'Vehicle Year': 2016,
				// 	'Vehicle Make': 'Ford',
				// 	'Vehicle Model': 'Mustang',
				// 	'Vehicle Mileage': '27000',
				// });

				// this.window.ga('set', {
				// 	'dimension6': '004',
				// 	'dimension3': 2016,
				// 	'dimension4': 'Ford',
				// 	'dimension5': 'Mustang',
				// 	'dimension2': '27000',
				// });

				if (!!this.workOrder && !!this.workOrder.Id) {
					const companyNumber = this.workOrder.Id.substring(0, 3);

					this.storeInfoSubscription =
						this.storeInfoService.getStoreInfo(environment.apiBaseUrl, companyNumber, environment.httpOptions)
							.subscribe(() => {});
				}
			});
	}

	private getInspectionReport(): void {
		this.inspectionService.getInspectionReport(this.inspectionId, false)
			.pipe(
				first()
			)
			.subscribe((response) => {
				this.inspectionItems = response;
			});
	}

	private updateActiveTab(): void {
		this.routeLinks.forEach(tab => tab.isActive = (tab.link === this.router.url));
	}
}

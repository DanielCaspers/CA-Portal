import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
	selector: 'ma-inspection-detail',
	templateUrl: './inspection-detail.component.html',
	styleUrls: [ './inspection-detail.component.scss' ]
})
export class InspectionDetailComponent implements OnDestroy, OnInit {

	public routeLinks = [
		{
			label: 'Report',
			link: `/inspections/report`,
			index: 0
		},
		{
			label: 'Table',
			link: `/inspections/table`,
			index: 1
		}
	];

	private activeLinkIndex = 0;
	private routerSubscription;

	constructor(private router: Router) {
	}

	public ngOnInit(): void {
		this.routerSubscription = this.router.events
			.filter(event => event instanceof NavigationEnd)
			.subscribe(() => {
				this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === this.router.url));
			});
	}

	public ngOnDestroy(): void {
		this.routerSubscription.unsubscribe();
	}

}

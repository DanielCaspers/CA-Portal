import { Component, Input, ViewEncapsulation } from '@angular/core';

import {
	RecommendedService,
	RecommendedServicesDialogService
} from 'murphy-automotive-shared-library';

@Component({
	selector: 'ma-vehicle-card',
	templateUrl: './vehicle-card.component.html',
	styleUrls: [ './vehicle-card.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VehicleCardComponent {

	@Input()
	public make: string;

	@Input()
	public model: string;

	@Input()
	public license: string;

	@Input()
	public recommendedServices: RecommendedService[] = [];

	@Input()
	public recommendedServiceSeverity: number;

	@Input()
	public year: string;

	constructor(private recommendedServicesDialogService: RecommendedServicesDialogService) {
	}

	public openRecommendedServicesDialog(): void {
		this.recommendedServicesDialogService.open(this.recommendedServices);
	}
}

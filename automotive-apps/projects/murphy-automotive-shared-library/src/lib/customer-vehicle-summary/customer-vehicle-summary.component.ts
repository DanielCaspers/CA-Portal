import { Component, Input } from '@angular/core';

@Component({
	selector: 'ma-customer-vehicle-summary',
	templateUrl: './customer-vehicle-summary.component.html',
	styleUrls: [ './customer-vehicle-summary.component.scss' ]
})
export class CustomerVehicleSummaryComponent {

	@Input()
	public vehicle;

	constructor() {
	}
}

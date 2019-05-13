import { Component, Input, ViewEncapsulation } from '@angular/core';

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
	public recommendedServiceSeverity: string;

	@Input()
	public year: string;

	constructor() {
	}
}

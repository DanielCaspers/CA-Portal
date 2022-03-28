import { Component, Input } from '@angular/core';

@Component({
	selector: 'ma-vehicle-color-indicator',
	templateUrl: './vehicle-color-indicator.component.html',
	styleUrls: [ './vehicle-color-indicator.component.scss' ]
})
export class VehicleColorIndicatorComponent {

	@Input()
	public color: string;

	constructor() { }
}

import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'ma-coupon-card',
	templateUrl: './coupon-card.component.html',
	styleUrls: [ './coupon-card.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class CouponCardComponent {

	@Input()
	public imgSrc: string;

	constructor() {
	}
}

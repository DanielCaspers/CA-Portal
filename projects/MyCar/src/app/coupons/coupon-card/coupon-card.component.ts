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

	@Input()
	public offerExclusive: string;

	constructor() {
	}

	public onClick(): void {
		window.open(this.imgSrc, '_blank');
	}
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Coupon, CouponOfferType } from '../coupon.models';

@Component({
	selector: 'ma-my-coupons',
	templateUrl: './my-coupons.component.html',
	styleUrls: [ './my-coupons.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class MyCouponsComponent implements OnInit {

	public coupons: Coupon[] = [
		{
			imgSrc: 'https://www.protech-automotive.com/Special-Offers/getcpn.php?c=004&code=IWRX&fdate=',
			offerType: CouponOfferType.General
		},
		{
			imgSrc: 'https://www.protech-automotive.com/Special-Offers/getcpn.php?c=004&code=GT100&fdate=',
			offerType: CouponOfferType.Tire
		},
		{
			imgSrc: 'https://www.protech-automotive.com/Special-Offers/getcpn.php?c=004&code=IWBT&fdate=',
			offerType: CouponOfferType.General
		},
		{
			imgSrc: 'https://www.protech-automotive.com/Special-Offers/getcpn.php?c=004&code=IWWS&fdate=',
			offerType: CouponOfferType.General
		},
		{
			imgSrc: 'https://www.protech-automotive.com/Special-Offers/getcpn.php?c=004&code=VP70&fdate=',
			offerType: CouponOfferType.Tire
		},
		{
			imgSrc: 'https://www.protech-automotive.com/Special-Offers/getcpn.php?c=004&code=LUBE8&fdate=',
			offerType: CouponOfferType.General
		},
		{
			imgSrc: 'https://www.protech-automotive.com/Special-Offers/getcpn.php?c=004&code=WRMI&fdate=',
			offerType: CouponOfferType.General
		}
	];

	public tireOffers = this.coupons.filter(c => c.offerType === CouponOfferType.Tire);
	public generalOffers = this.coupons.filter(c => c.offerType === CouponOfferType.General);

	constructor() {
	}

	ngOnInit() {
	}

}

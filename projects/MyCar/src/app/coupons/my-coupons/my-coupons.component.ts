import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Coupon } from '../coupon.models';
import { CouponHttpService } from '../coupon-http.service';

@Component({
	selector: 'ma-my-coupons',
	templateUrl: './my-coupons.component.html',
	styleUrls: [ './my-coupons.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class MyCouponsComponent implements OnInit {

	public coupons: Coupon[] = [];
	public hasLoadedCoupons = false;

	private vehicleId: string;

	constructor(
		private couponHttpService: CouponHttpService,
		private route: ActivatedRoute) {
	}

	public ngOnInit(): void {
		this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');

		const couponObservable: Observable<Coupon[]> =
			!!this.vehicleId ?
				this.couponHttpService.getCouponsForVehicle(this.vehicleId) :
				this.couponHttpService.getCouponsForClient();

		couponObservable
			.pipe(
				first()
			)
			.subscribe(coupons => {
				this.coupons = coupons;
				this.hasLoadedCoupons = true;
			});
	}
}

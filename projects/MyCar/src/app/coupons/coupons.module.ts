import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { CouponsRoutingModule } from './coupons-routing.module';
import { MyCouponsComponent } from './my-coupons/my-coupons.component';
import { CouponCardComponent } from './coupon-card/coupon-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	declarations: [ MyCouponsComponent, CouponCardComponent ],
	entryComponents: [ MyCouponsComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,

		MatCardModule,

		CouponsRoutingModule
	]
})
export class CouponsModule {
}

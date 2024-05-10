import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CouponsRoutingModule } from './coupons-routing.module';
import { MyCouponsComponent } from './my-coupons/my-coupons.component';
import { CouponCardComponent } from './coupon-card/coupon-card.component';
import { CouponHttpService } from './coupon-http.service';

@NgModule({
    declarations: [MyCouponsComponent, CouponCardComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        CouponsRoutingModule
    ],
    providers: [CouponHttpService]
})
export class CouponsModule {
}

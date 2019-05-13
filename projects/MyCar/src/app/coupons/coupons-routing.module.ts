import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCouponsComponent } from './my-coupons/my-coupons.component';

export const couponRoutes: Routes = [
	{
		path: '',
		component: MyCouponsComponent
	},
];

@NgModule({
	imports: [ RouterModule.forChild(couponRoutes) ],
	exports: [ RouterModule ]
})
export class CouponsRoutingModule {
}

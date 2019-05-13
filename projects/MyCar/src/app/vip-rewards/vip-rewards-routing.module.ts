import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VipRewardsComponent } from './vip-rewards.component';

export const vipRewardsRoutes: Routes = [
	{
		path: '',
		component: VipRewardsComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(vipRewardsRoutes) ],
	exports: [ RouterModule ]
})
export class VipRewardsRoutingModule {
}

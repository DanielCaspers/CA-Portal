import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyAccountComponent } from './my-account.component';

export const accountRoutes: Routes = [
	{
		path: '',
		component: MyAccountComponent
	},
];

@NgModule({
	imports: [ RouterModule.forChild(accountRoutes) ],
	exports: [ RouterModule ]
})
export class MyAccountRoutingModule {
}

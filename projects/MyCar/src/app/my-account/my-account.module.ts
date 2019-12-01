import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';

import {
	MatButtonModule,
	MatInputModule,
	MatFormFieldModule
} from '@angular/material';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { AccountHttpService } from './account-http.service';
import { VipRewardsModule } from './vip-rewards/vip-rewards.module';

@NgModule({
	declarations: [ MyAccountComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,

		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,

		VipRewardsModule,
		MyAccountRoutingModule
	],
	entryComponents: [ MyAccountComponent ],
	providers: [ AccountHttpService ]
})
export class MyAccountModule {
}

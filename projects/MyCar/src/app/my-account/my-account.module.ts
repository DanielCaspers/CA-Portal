import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

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
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTooltipModule,

		VipRewardsModule,
		MyAccountRoutingModule
	],
	entryComponents: [ MyAccountComponent ],
	providers: [ AccountHttpService ]
})
export class MyAccountModule {
}

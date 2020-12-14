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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { AccountHttpService } from './account-http.service';
import { VipRewardsModule } from './vip-rewards/vip-rewards.module';
import { ConfirmDialogModule } from 'murphy-automotive-shared-library';
import { TelInputModule } from '../../../../murphy-automotive-shared-library/src/lib/tel-input/tel-input.module';
import { PhoneNumberPipeModule } from '../../../../murphy-automotive-shared-library/src/lib/phone-number-pipe/phone-number.module';

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
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatRadioModule,
		MatSelectModule,
		MatTabsModule,
		MatTooltipModule,

		VipRewardsModule,
		MyAccountRoutingModule,
		ConfirmDialogModule,
		TelInputModule,
		PhoneNumberPipeModule
	],
	entryComponents: [ MyAccountComponent ],
	providers: [ AccountHttpService ]
})
export class MyAccountModule {
}

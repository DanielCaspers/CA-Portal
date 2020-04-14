import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
	SafeUrlModule
} from 'murphy-automotive-shared-library';

import { VehicleHistoryRoutingModule } from './vehicle-history-routing.module';
import { VehicleHistoryComponent } from './vehicle-history.component';
import { VehicleHistoryHttpService } from './vehicle-history-http.service';


@NgModule({
	declarations: [ VehicleHistoryComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,

		MatButtonModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatSelectModule,
		MatToolbarModule,

		SafeUrlModule,

		VehicleHistoryRoutingModule
	],
	entryComponents: [ VehicleHistoryComponent ],
	providers: [ VehicleHistoryHttpService ]
})
export class VehicleHistoryModule {
}

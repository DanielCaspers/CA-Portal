import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';

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

		SafeUrlModule,

		VehicleHistoryRoutingModule
	],
	entryComponents: [ VehicleHistoryComponent ],
	providers: [ VehicleHistoryHttpService ]
})
export class VehicleHistoryModule {
}

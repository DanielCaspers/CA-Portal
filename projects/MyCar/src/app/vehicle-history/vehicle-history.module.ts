import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {
	SafeUrlModule
} from 'murphy-automotive-shared-library';

import { VehicleHistoryRoutingModule } from './vehicle-history-routing.module';
import { VehicleHistoryComponent } from './vehicle-history.component';
import { VehicleHistoryHttpService } from './vehicle-history-http.service';
import { FormsModule } from '@angular/forms';


@NgModule({
	declarations: [ VehicleHistoryComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,

		FormsModule,
		MatButtonModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatSelectModule,
		MatToolbarModule,

		Ng2SearchPipeModule,

		SafeUrlModule,

		VehicleHistoryRoutingModule
	],
	entryComponents: [ VehicleHistoryComponent ],
	providers: [ VehicleHistoryHttpService ]
})
export class VehicleHistoryModule {
}

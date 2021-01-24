import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxAnalyticsModule } from 'ngx-analytics';

import {
	ConfirmDialogModule,
	RecommendedServicesModule,
} from 'murphy-automotive-shared-library';

import { MyVehiclesRoutingModule } from './my-vehicles-routing.module';
import { MyVehiclesComponent } from './my-vehicles.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehiclesHttpService } from './vehicles-http.service';

@NgModule({
	declarations: [ MyVehiclesComponent, VehicleCardComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,
		HttpClientModule,

		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatMenuModule,

		NgxAnalyticsModule,

		ConfirmDialogModule,
		RecommendedServicesModule,

		MyVehiclesRoutingModule
	],
	entryComponents: [ MyVehiclesComponent ],
	providers: [ VehiclesHttpService ]
})
export class MyVehiclesModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { RecommendedServicesDialogComponent } from './recommended-services-dialog.component';
import { RecommendedServicesDialogService } from './recommended-services-dialog.service';
import { RecommendedServiceSeverityModule } from '../recommended-service-severity/recommended-service-severity.module';

@NgModule({
    declarations: [
        RecommendedServicesDialogComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        RecommendedServiceSeverityModule
    ],
    providers: [
        RecommendedServicesDialogService
    ],
    exports: [
        RecommendedServicesDialogComponent
    ]
})
class RecommendedServicesDialogModule {}

export {
	RecommendedServicesDialogModule,
	RecommendedServicesDialogService
};

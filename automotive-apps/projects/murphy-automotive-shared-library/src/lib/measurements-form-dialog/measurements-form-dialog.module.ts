import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { MeasurementsFormDialogComponent } from './measurements-form-dialog.component';
import { MeasurementsFormDialogService } from './measurements-form-dialog.service';

@NgModule({
	declarations: [
		MeasurementsFormDialogComponent
	],
	entryComponents: [
		MeasurementsFormDialogComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule
	],
	providers: [
		MeasurementsFormDialogService
	],
	exports: [
		MeasurementsFormDialogComponent
	]
})
class MeasurementsFormDialogModule {}

export {
	MeasurementsFormDialogModule,
	MeasurementsFormDialogService
};

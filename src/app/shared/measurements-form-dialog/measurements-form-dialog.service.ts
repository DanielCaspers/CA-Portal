import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MeasurementsFormDialogComponent } from './measurements-form-dialog.component';

@Injectable()
export class MeasurementsFormDialogService {

	constructor(private dialog: MatDialog ) { }

	public open(inspectionItem: any): void {
		this.dialog.open(MeasurementsFormDialogComponent, {
			data:  {
				name: inspectionItem.Name,
				measurements: inspectionItem.Measurements
			}
		});
	}
}

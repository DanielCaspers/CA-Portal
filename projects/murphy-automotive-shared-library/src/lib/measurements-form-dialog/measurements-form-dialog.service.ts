import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeasurementsFormDialogComponent } from './measurements-form-dialog.component';

export interface IMeasurementsViewModel {
	name: string;
	measurements: {
		label: string;
		value: string;
		unit: string;
	}[];
}


@Injectable()
export class MeasurementsFormDialogService {

	constructor(private dialog: MatDialog ) { }

	public open(inspectionItem: any): void {
		this.dialog.open(MeasurementsFormDialogComponent, {
			data:  {
				name: inspectionItem.Name,
				measurements: inspectionItem.Measurements
			} as IMeasurementsViewModel
		});
	}
}

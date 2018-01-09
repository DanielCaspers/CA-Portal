import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ma-measurements-form-dialog',
  templateUrl: './measurements-form-dialog.component.html',
  styleUrls: ['./measurements-form-dialog.component.scss']
})
export class MeasurementsFormDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogData } from './confirm-dialog.service';

@Component({
	selector: 'ma-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

}

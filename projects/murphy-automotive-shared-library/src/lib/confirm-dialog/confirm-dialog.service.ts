import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

export interface ConfirmDialogData {
	title: string;
	body: string;
	confirmText: string;
	cancelText: string;
}

@Injectable()
export class ConfirmDialogService {

	constructor(private dialog: MatDialog) { }

	// public open(config: MatDialogConfig): void {
	// 	this.dialog.open(ConfirmDialogComponent, config);
	// }

	public open(title: string, body: string, confirmText: string, cancelText: string):
		MatDialogRef<ConfirmDialogComponent, ConfirmDialogData> {
		return this.dialog.open(ConfirmDialogComponent, {
			data: {
				title,
				body,
				confirmText,
				cancelText
			}
		});
	}
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'ma-recommended-services-dialog',
	templateUrl: './recommended-services-dialog.component.html',
	styleUrls: ['./recommended-services-dialog.component.scss']
})
export class RecommendedServicesDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RecommendedServicesDialogComponent } from './recommended-services-dialog.component';
import { RecommendedService } from '../recommended-services.models';

@Injectable()
export class RecommendedServicesDialogService {

	constructor(private dialog: MatDialog ) { }

	public open(recommendedServices: RecommendedService[]): void {
		this.dialog.open(RecommendedServicesDialogComponent, {
			data: {
				recommendedServices,
			},
			maxWidth: '95vw' // Expanding the dialog to nearly full width to get the most out of mobile form factors
		});
	}
}

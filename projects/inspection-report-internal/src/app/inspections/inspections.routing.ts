import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionReportGroupedComponent, InspectionReportItemListComponent } from 'murphy-automotive-shared-library';

export const inspectionRoutes: Routes = [
	{
		path: ':id',
		component: InspectionDetailComponent,
		children: [
			{ path: '', redirectTo: 'report', pathMatch: 'full' },
			{
				path: 'report',
				component: InspectionReportGroupedComponent,
				data: {
					collapsedHeight: '40px',
					expandedHeight: '40px'
				}
			},
			{
				path: 'priority',
				component: InspectionReportItemListComponent,
				data: {
					displayMode: 'flat',
					multi: true
				}
			}
		]
	},
];

@NgModule({
	imports: [ RouterModule.forChild(inspectionRoutes) ],
	exports: [ RouterModule ]
})
export class InspectionsRoutingModule {
}

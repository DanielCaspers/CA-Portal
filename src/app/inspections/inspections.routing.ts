import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionReportGroupedComponent } from './inspection-report-grouped/inspection-report-grouped.component';
import { InspectionReportItemListComponent } from './inspection-report-item-list/inspection-report-item-list.component';

const routes: Routes = [
	{
		path: ':id',
		component: InspectionDetailComponent,
		children: [
			{ path: '', redirectTo: 'report', pathMatch: 'full' },
			{
				path: 'report',
				component: InspectionReportGroupedComponent
			},
			{
				path: 'priority',
				component: InspectionReportItemListComponent
			}
		]
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class InspectionsRoutingModule {
}

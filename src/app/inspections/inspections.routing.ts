import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionReportComponent } from './inspection-detail/inspection-report/inspection-report.component';
import { InspectionReportItemListComponent } from './inspection-detail/inspection-report-item-list/inspection-report-item-list.component';

const routes: Routes = [
	{
		path: ':id',
		component: InspectionDetailComponent,
		children: [
			{ path: '', redirectTo: 'report', pathMatch: 'full' },
			{
				path: 'report',
				component: InspectionReportComponent
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

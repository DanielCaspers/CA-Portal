import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionReportComponent } from './inspection-detail/inspection-report/inspection-report.component';
import { InspectionTableComponent } from './inspection-detail/inspection-table/inspection-table.component';

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
				path: 'table',
				component: InspectionTableComponent
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

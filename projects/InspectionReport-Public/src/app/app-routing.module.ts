import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionReportCoreViewComponent } from 'murphy-automotive-shared-library';
import { inspectionRoutes } from './inspections/inspections.routing';

const routes: Routes = [
	{
		path: '',
		component: InspectionReportCoreViewComponent,
		children: [
			{ path: '', redirectTo: 'inspections', pathMatch: 'full' },
			{
				path: 'inspections',
				children: inspectionRoutes
			}
		]
	},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
}

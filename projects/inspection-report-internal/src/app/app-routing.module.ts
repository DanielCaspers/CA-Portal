import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreViewComponent } from '../../../murphy-automotive-shared-library/src/lib/inspection-report/core-view/core-view.component';
import { inspectionRoutes } from '../../../murphy-automotive-shared-library/src/lib/inspection-report/inspections/inspections.routing';

const routes: Routes = [
	{
		path: '',
		component: CoreViewComponent,
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

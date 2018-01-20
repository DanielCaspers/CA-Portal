import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreViewComponent } from './core-view/core-view.component';

const routes: Routes = [
	{
		path: '',
		component: CoreViewComponent,
		children: [
			{ path: '', redirectTo: 'inspections', pathMatch: 'full' },
			{
				path: 'inspections',
				loadChildren: './inspections/inspections.module#InspectionsModule'
			}
		]
	},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, {useHash: true})],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
}

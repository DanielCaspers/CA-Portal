import { Component } from '@angular/core';
import { gitInfo } from '../../../../git-version';

@Component({
	selector: 'ma-root',
	template: `
		<router-outlet></router-outlet>
		<ma-commit-summary [gitInfo]="gitInfo"></ma-commit-summary>
	`
})
export class AppComponent {

	public gitInfo = gitInfo;

	constructor() { }
}

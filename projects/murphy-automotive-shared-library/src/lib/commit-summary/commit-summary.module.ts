import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommitSummaryComponent } from './commit-summary.component';

@NgModule({
	declarations: [
		CommitSummaryComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		CommitSummaryComponent
	]
})
export class CommitSummaryModule {
}

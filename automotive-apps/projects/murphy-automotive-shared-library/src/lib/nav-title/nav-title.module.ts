import { NgModule } from '@angular/core';
import { NavTitleService } from './nav-title.service';

@NgModule({
	providers: [
		NavTitleService
	]
})
export class NavTitleModule {
	constructor(private titleService: NavTitleService) {
		this.titleService.init();
	}
}

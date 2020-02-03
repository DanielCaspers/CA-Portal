import { Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: [ './loader.component.scss' ]
})
export class LoaderComponent {

	public isLoading: boolean;

	constructor(private loaderService: LoaderService) {
		this.loaderService.isLoading.subscribe((v) => {
			console.log('Is displaying global loading indicator?', v);
			this.isLoading = v;
		});
	}
}

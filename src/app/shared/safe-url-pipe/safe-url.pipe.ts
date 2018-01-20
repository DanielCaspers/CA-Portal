import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
	name: 'safeUrl'
})

/**
 * Required to assert URLs that we receive from the server are in fact trusted
 * https://stackoverflow.com/a/40756718/2831961
 */
export class SafeUrlPipe implements PipeTransform {
	constructor(private domSanitizer: DomSanitizer) {}
	public transform(url: string) {
		return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
	}
}

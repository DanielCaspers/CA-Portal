import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import convert from 'color-convert';

@Directive({
	selector: '[maAutoContrast]'
})
export class AutoContrastDirective implements OnInit {
	@Input()
	/**
	 * E.g. 'blue'
	 */
	public bgColor: string;

	constructor(private el: ElementRef) {
	}

	public ngOnInit(): void {
		this.colorBackground();
		this.colorText();
	}

	private colorBackground(): void {
		this.el.nativeElement.style.color = this.bgColor;
	}

	private colorText(): void {
		const [ r, g, b ] = convert.keyword.rgb(this.el.nativeElement.style.backgroundColor);

		const radix = 10;
		// http://www.w3.org/TR/AERT#color-contrast
		const perceivedBrightness = Math.round(((parseInt(r, radix) * 299) +
			(parseInt(g, radix) * 587) +
			(parseInt(b, radix) * 114)) / 1000);

		this.el.nativeElement.style.backgroundColor = (perceivedBrightness > 125) ? 'black' : 'white';
	}
}

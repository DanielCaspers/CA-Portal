import { Pipe, PipeTransform } from '@angular/core';
import { TelephoneViewModel } from '../tel-input/tel-input.models';

@Pipe({
	name: 'maPhoneNumber'
})

export class PhoneNumberPipe implements PipeTransform {
	constructor() {}

	public transform(phoneNumber: TelephoneViewModel) {
		return '(' + phoneNumber.area + ') ' + phoneNumber.exchange + '-' + phoneNumber.subscriber;
	}
}

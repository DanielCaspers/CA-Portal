export interface Address {
	clientName?: string;
	clientAddr?: string;
	clientAddr2?: string;
	clientCity?: string;
	clientState?: string;
	clientZip?: string;
}

export interface AccountOverview extends Address {
	clientID?: string;
	clientEmail?: EmailAddress[];

	clientPhone?: PhoneNumber[];

	loyaltyAccount?: {
		vipPointBalance?: number;
		vipRedeemedValue?: number;
	};
}

export interface PhoneNumber {
	number: string;
	name: string;
	type: 'C' | 'W' | 'F' | 'H';
	smsReminders: boolean;
	smsThankYous: boolean;
}

export interface EmailAddress {
	emailAddress?: string;
	name?: string;
	emailReminders?: boolean;
	emailThankYous?: boolean;
	emailStatements?: boolean;
	emailPromos?: boolean;
}

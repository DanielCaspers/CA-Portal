export interface StoreInfo {
	CompanyName: string;
	CompanyNumber: number;
	EmailAddress: EmailAddress;
	PhoneNumberToCall?: WebPhoneNumber;
	PhoneNumberToSMS?: WebPhoneNumber;
	StoreWebAssets?: StoreWebAssets;
	StoreAddress?: StoreAddress;
}

export interface EmailAddress {
	DisplayValue: string;
	MailtoLink: string;
}

export interface WebPhoneNumber {
	ContactName?: string;
	Number?: string;
	NumberForWebLink?: string;
}

export interface StoreWebAssets {
	LogoSmall?: string;
	WebAddress?: string;
}

export interface StoreAddress {
	Line1?: string;
	City?: string;
	StateShort?: string;
	ZIP?: string;
}



export interface AccountOverview {
	clientID: string;

	clientName: string;

	// Address
	clientAddr: string;
	clientAddr2: string;
	clientCity: string;
	clientState: string;
	clientZip: string;

	clientPhone: PhoneNumber[];

	loyaltyAccount: {
		vipPointBalance: number;
		vipRedeemedValue: number;
	};
}

export interface PhoneNumber {
	number: string;
	name: string;
	type: 'C' | 'W' | 'F';
	smsPrefs: string;
}

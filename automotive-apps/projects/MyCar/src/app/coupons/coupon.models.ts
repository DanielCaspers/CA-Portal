export enum CouponOfferType {
	Tire = 'Tire',
	General = 'General'
}

export interface Coupon {
	imgSrc: string;
	offerType: CouponOfferType;
}

export enum VipRewardType {
	OilChange = 'OilChange',
	Service = 'Service' // Car washes count as services
}

export interface VipReward {
	type: VipRewardType;
    description: {
        primary: string;
        secondary: string;
    }
	points: number;
}

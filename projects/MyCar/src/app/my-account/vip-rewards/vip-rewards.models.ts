export enum VipRewardType {
	OilChange = 'OilChange',
	Service = 'Service' // Car washes count as services
}

export interface VipReward {
	type: VipRewardType;
    description: {
        heading: string;
        subheading: string;
    }
	pointCost: number;
}

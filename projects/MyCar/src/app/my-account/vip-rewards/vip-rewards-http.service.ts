import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthTokenService } from '../../auth/auth-token.service';
import { VipReward, VipRewardType } from './vip-rewards.models';

@Injectable()
export class VipRewardsHttpService {

	private static dtoMapper(couponDtos: any[]): VipReward[] {
		return couponDtos.map((dto) => {
			return {
				type: dto.isLOF ?
					VipRewardType.OilChange :
					VipRewardType.Service,
				description: {
					primary: dto.rewardDesc1,
					secondary: dto.rewardDesc2
				},
				points: dto.points,
			} as VipReward;
		});
	}

	constructor(
		private authTokenService: AuthTokenService,
		private httpClient: HttpClient,
		private jwtHelperService: JwtHelperService) {
	}

	public getVipRewards(): Observable<VipReward[]> {
		const token = this.jwtHelperService.decodeToken(this.authTokenService.authToken);

		return this.httpClient.get<any[]>(
			`${environment.apiBaseUrl}/vip/${token.conos[0]}`,
			environment.httpOptions)
			.pipe(
				map(VipRewardsHttpService.dtoMapper)
			);
	}
}

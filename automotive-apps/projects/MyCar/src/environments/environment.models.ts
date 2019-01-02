import { MaEnvironmentBase } from '../../../../environment.model';

export interface MyCarEnvironment extends MaEnvironmentBase {
	/**
	 * The endpoint used to log in the user
	 */
	authorizationUrl: string;
}

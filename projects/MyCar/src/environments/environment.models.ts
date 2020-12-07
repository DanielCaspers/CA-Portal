import { MaEnvironmentBase } from '../../../../environment.model';

export interface MyCarEnvironment extends MaEnvironmentBase {

	/**
	 * The URL which the app will redirect the user to in order to log on.
	 */
	oauthProviderUrl: string;
}

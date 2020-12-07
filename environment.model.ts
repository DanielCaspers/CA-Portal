import { HttpHeaders } from '@angular/common/http';

export interface MaEnvironmentBase {
	production: boolean;

	/**
	 * The base URL which the app will fetch data from via AJAX.
	 */
	apiBaseUrl: string;

	/**
	 * The URL which the app will redirect the user to in order to log on.
	 */
	oauthProviderUrl: string;

	/**
	 * The options to be applied to the HttpClient which makes requests to the API specified by
	 * apiBaseUrl
	 */
	httpOptions: { headers: HttpHeaders };

	/**
	 * Google analytics integration settings
	 * https://github.com/SnakeByteDevelopment/angulartics2/tree/master/src/lib/providers/ga
	 */
	googleAnalytics?: {
		/**
		 * 'auto', 'none'
		 */
		domain: string;
		trackingId: string;
	};
}

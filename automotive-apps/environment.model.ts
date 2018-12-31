import { HttpHeaders } from '@angular/common/http';

export interface MaEnvironment {
	production: boolean;

	/**
	 * The base URL which the app will fetch data from via AJAX.
	 */
	apiBaseUrl: string;

	/**
	 * The options to be applied to the HttpClient which makes requests to the API specified by
	 * apiBaseUrl
	 */
	httpOptions: { headers: HttpHeaders };
}

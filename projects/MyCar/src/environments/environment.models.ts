import { MaEnvironmentBase } from '../../../../environment.model';

export interface MyCarEnvironment extends MaEnvironmentBase {
	/**
	 * The endpoint used to log in the user
	 */
	authorizationUrl: string;

	/**
	 * Partial URI which accepts the "Invoice Link ID"
	 * parameter for showing online invoices.
	 * (e.g. https://d3api.murphyauto.net/showInv.php?invoice=)
	 */
	invoiceServiceUrl: string;
}

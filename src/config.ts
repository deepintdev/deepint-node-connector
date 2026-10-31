// Configuration Source : https://github.com/deepintdev/deepint-external-source-mongo/blob/master/src/config.ts 

"use strict";

import 'dotenv/config';

/**
 * Default AIR-Core API URL (the platform was formerly known as Deep Intelligence, app.deepint.net).
 */
export const DEFAULT_API_URL = "https://app.air-core.io/api/v1/";

/**
 * Configuration class
 */
export class Config {

    public static instance: Config;

    /**
     * Return a configuration variable
     * @returns the instance of the configuration requested
     */
    public static getInstance() {
        if (Config.instance) {
            return Config.instance;
        }

        Config.instance = new Config();

        return Config.instance;
    }


    /**
     * Base URL of the AIR-Core API (formerly Deep Intelligence), e.g. `https://app.air-core.io/api/v1/`.
     * Must end with a trailing slash.
     */
    public deepintURL: string;
    /**
     * Optional base URL of the OAuth endpoints (e.g. `https://app.air-core.io/api/oauth/`).
     * When empty, it is derived from `deepintURL` (`<api base>/../oauth/`).
     */
    public oauthURL: string;
    public X_AUTH_TOKEN: string;
    public X_DEEPINT_ORGANIZATION: string;

    public pubKey: string;
    public secretKey: string;



    constructor() {

        // AIRCORE_* variables take precedence; legacy DEEPINT_* variables are still supported.
        this.deepintURL = process.env.AIRCORE_API_URL || process.env.DEEPINT_API_URL || DEFAULT_API_URL;
        this.oauthURL = process.env.AIRCORE_OAUTH_URL || "";
        this.X_AUTH_TOKEN = process.env.X_AUTH_TOKEN || "";
        this.X_DEEPINT_ORGANIZATION = process.env.X_AIRCORE_ORGANIZATION || process.env.X_DEEPINT_ORGANIZATION || "";

        this.pubKey = process.env.SOURCE_PUB_KEY || "";
        this.secretKey = process.env.SOURCE_SECRET_KEY || "";

    }

    /**
     * Returns the URL of an OAuth endpoint (e.g. `login`, `revoke`).
     * Uses `oauthURL` if set, otherwise derives it from the configured API URL,
     * so the default is `https://app.air-core.io/api/oauth/<endpoint>`.
     * @param endpoint the OAuth endpoint name
     */
    public getOAuthURL(endpoint: string): string {
        const base = this.oauthURL || (new URL("../oauth/", this.deepintURL)).toString();
        return (new URL(endpoint, base)).toString();
    }

    /**
     * Sets the AIR-Core user authentication token value used to authenticate requests against the AIR-Core API
     * @param token the token to set
     */
    public setToken(token: string) {
        this.X_AUTH_TOKEN = token;
    }

    /**
     * Sets the AIR-Core organization value used to authenticate requests against the AIR-Core API
     * @param organization the organization to set
     */    
    public setOrganization(organization: string) {
        this.X_DEEPINT_ORGANIZATION = organization;
    }
}
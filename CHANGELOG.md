# Changelog

## 1.1.0

### Changed
- The MongoDB source tests read their connection data from TEST_MONGO_URL, TEST_MONGO_USER, TEST_MONGO_PASSWORD and TEST_MONGO_HOST instead of having it in the repository.
- The platform formerly known as Deep Intelligence is now AIR-Core. The default API URL is now `https://app.air-core.io/api/v1/` (was `https://app.deepint.net/api/v1/`).
- `postLoginToken` and `postRevokeToken` now use the OAuth endpoints of the configured instance (`/api/oauth/login` and `/api/oauth/revoke`, by default on `https://app.air-core.io`) instead of a hard-coded `app.deepint.net` host.
- README and package metadata updated to the AIR-Core name. The hotlinked logo from deepint.net was removed from the README.

### Added
- `AIRCORE_API_URL` and `X_AIRCORE_ORGANIZATION` environment variables. They take precedence over the legacy `DEEPINT_API_URL` and `X_DEEPINT_ORGANIZATION`, which are still supported.
- Optional `AIRCORE_OAUTH_URL` environment variable and `Config.oauthURL` property to override the OAuth base URL, plus `Config.getOAuthURL(endpoint)`.

### Compatibility
- Package name, exported functions, `Config` properties and HTTP headers (`x-auth-token`, `x-deepint-organization`) are unchanged.
- To keep targeting the legacy host, set `AIRCORE_API_URL` (or `DEEPINT_API_URL`) to `https://app.deepint.net/api/v1/`.

import { LitElement, html, css } from "../lib/lit.js";
import { baseStyles } from "../lib/wc-base.js";

export class CapNotificationBanner extends LitElement {
	static styles = [
		baseStyles,
		css`
			.banner {
				display: flex;
				font-size: var(--font-size-100);
				padding: var(--spacing-75);
				background-color: var(--color-yellow);
			}

			.banner__message {
				margin: auto;
			}

			.banner__link:link,
			.banner__link:visited,
			.banner__link:active {
				color: var(--color-gray-600);
			}

			.banner__link:hover {
				color: var(--color-gray-600);
			}
		`,
	];

	render() {
		return html`
			<div class="banner">
				<p class="banner__message">
					<b>Notice</b>: As part of the full public release of CAP data,
					the CAP API and search tool were sunset on September 5,
					2024. Full case data continues to be available for
					<a class="banner__link" href="https://case.law/caselaw/">browsing</a> and for <a class="banner__link" href="https://static.case.law/">bulk download</a> on our site, and search and API access are available through the
					Free Law Project at <a class="banner__link"
					href="https://www.courtlistener.com/">CourtListener.com</a>.
					See our <a class="banner__link" href="https://case.law/docs/">docs</a>
					for details.
				</p>
			</div>
		`;
	}
}

customElements.define("cap-notification-banner", CapNotificationBanner);

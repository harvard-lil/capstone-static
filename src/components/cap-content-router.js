import { html, css, LitElement } from "../lib/lit.js";

import "./cap-volume.js";
import "./cap-case.js";
import "./cap-jurisdictions.js";
import "./cap-reporter.js";
import "./cap-disambiguate.js";

export default class CapContentRouter extends LitElement {
	static styles = [
		css`
			cap-case {
				display: block;
				margin: auto;
				padding-top: var(--spacing-250);
				padding-bottom: var(--spacing-500);

				@media (min-width: 65rem) {
					flex: 0 0 58.33333%;
					max-width: 58.33333%;
				}
			}
		`,
	];

	render() {
		const searchParams = new URLSearchParams(window.location.search);
		const reporter = searchParams.get("reporter");
		const volume = searchParams.get("volume");
		const casePath = searchParams.get("case");
		const disambiguate = searchParams.get("disambiguate");
		const cite = searchParams.get("cite");

		if (!!disambiguate) {
			return html`<cap-disambiguate
				list="${disambiguate},"
				cite=${cite}
			></cap-disambiguate>`;
		}

		if (!!casePath && !!volume && !!reporter) {
			return html`<cap-case
				reporter=${reporter}
				volume=${volume}
				case=${casePath}
			></cap-case>`;
		}

		if (!!volume && !!reporter) {
			return html`<cap-volume
				reporter=${reporter}
				volume=${volume}
			></cap-volume>`;
		}

		if (!!reporter) {
			return html`<cap-reporter reporter=${reporter}></cap-reporter>`;
		}

		return html`<cap-jurisdictions></cap-jurisdictions>`;
	}
}

customElements.define("cap-content-router", CapContentRouter);

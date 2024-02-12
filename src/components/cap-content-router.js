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
				flex: 0 0 58.33333%;
				max-width: 58.33333%;
				margin: auto;
				padding-top: 2.5rem;
				padding-bottom: 3rem;
			}
		`,
	];

	render() {
		const searchParams = new URLSearchParams(window.location.search);
		const reporter = searchParams.get("reporter");
		const volume = searchParams.get("volume");
		const caseName = searchParams.get("case");
		const disambiguate = searchParams.get("disambiguate");
		const cite = searchParams.get("cite");

		if (!!disambiguate) {
			return html`<cap-disambiguate
				list="${disambiguate},"
				cite=${cite}
			></cap-disambiguate>`;
		}

		if (!!caseName && !!volume && !!reporter) {
			return html`<cap-case
				reporter=${reporter}
				volume=${volume}
				case=${caseName}
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

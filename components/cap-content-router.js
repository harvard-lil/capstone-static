import { html, LitElement } from "../lib/lit.js";

import "./cap-volume.js";
import "./cap-case.js";
import "./cap-jurisdictions.js";
import "./cap-reporter.js";

export default class CapContentRouter extends LitElement {
	render() {
		const searchParams = new URLSearchParams(window.location.search);
		const reporter = searchParams.get("reporter");
		const volume = searchParams.get("volume");
		const caseName = searchParams.get("case");

		if (caseName === null && volume === null && reporter === null) {
			return html`<cap-jurisdictions></cap-jurisdictions>`;
		} else if (caseName === null && volume === null && !!reporter) {
			return html`<cap-reporter reporter=${reporter}></cap-reporter>`;
		} else if (caseName === null && !!volume && !!reporter) {
			return html`<cap-volume
				reporter=${reporter}
				volume=${volume}
			></cap-volume>`;
		} else if (!!caseName && !!volume && !!reporter) {
			return html`<cap-case
				reporter=${reporter}
				volume=${volume}
				case=${caseName}
			></cap-case>`;
		} else {
			return html`<cap-jurisdictions></cap-jurisdictions>`;
		}
	}
}

customElements.define("cap-content-router", CapContentRouter);

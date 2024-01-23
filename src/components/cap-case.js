import { LitElement, html, css, unsafeHTML } from "../lib/lit.js";

import { fetchCaselawBody, fetchCaseMetadata } from "../lib/data.js";

export default class CapCase extends LitElement {
	static properties = {
		caseBody: { attribute: false },
		caseMetadata: { attribute: false },
		reporter: { type: String },
		volume: { type: String },
		case: { type: String },
	};

	constructor() {
		super();
		this.caseBody = "";
		this.caseMetadata = {};
	}

	connectedCallback() {
		super.connectedCallback();
		fetchCaselawBody(
			this.reporter,
			this.volume,
			this.case,
			(data) => (this.caseBody = data)
		);

		fetchCaseMetadata(
			this.reporter,
			this.volume,
			this.case,
			(data) => (this.caseMetadata = data)
		);
	}

	render() {
		/*
		This render method uses requestAnimationFrame to alter the links in
		the shadow DOM once it's been rendered to change the logical links
		to cited cases in the archived html to links to the presentation
		layer version of the case.
		*/

		// Skip the first frame which is the shadow DOM render
		const doNothing = () => {};
		// Rewrite the links on the second frame
		const rewriteLinks = () => {
			this.shadowRoot.querySelectorAll("a").forEach((a) => {
				const oldLink = a.getAttribute("href");
				//todo we need to fix this when ENG-523 happens
				a.href = oldLink + "#todo";
			});
		};
		window.requestAnimationFrame(doNothing);
		window.requestAnimationFrame(rewriteLinks);
		return html`${unsafeHTML(this.caseBody)}`;
	}
}

customElements.define("cap-case", CapCase);

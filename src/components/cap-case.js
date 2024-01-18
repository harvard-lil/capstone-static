import { LitElement, html, css, unsafeHTML } from "../lib/lit.js";

import { fetchCaselawBody } from "../lib/data.js";

export default class CapCase extends LitElement {
	static properties = {
		caseBody: { attribute: false },
		reporter: { type: String },
		volume: { type: String },
		case: { type: String },
	};

	constructor() {
		super();
		this.caseBody = "";
	}

	connectedCallback() {
		super.connectedCallback();
		fetchCaselawBody(this.reporter, this.volume, this.case, this);
	}

	render() {
		return html`${unsafeHTML(this.caseBody)}`;
	}
}

customElements.define("cap-case", CapCase);

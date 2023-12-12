import { LitElement, html, css, unsafeHTML } from "../lib/lit.js";

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
		this.fetchCaselawBody();
	}

	async fetchCaselawBody() {
		const url = `${BUCKET_ROOT}/${this.reporter}/${this.volume}/html/${this.case}-01.html`;
		const response = await fetch(url);
		this.caseBody = await response.text();
	}

	render() {
		console.log(this.caseBody);
		return html`${unsafeHTML(this.caseBody)}`;
	}
}

customElements.define("cap-case", CapCase);

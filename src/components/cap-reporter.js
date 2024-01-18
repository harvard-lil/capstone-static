import { LitElement, html, css } from "../lib/lit.js";
import { fetchVolumesData, fetchReporterData } from "../lib/data.js";

export default class CapReporter extends LitElement {
	static properties = {
		volumesData: { attribute: false },
		reporterData: { attribute: false },
		reporter: { type: String },
	};

	constructor() {
		super();
		this.volumesData = [];
		this.reporterData = {};
	}

	connectedCallback() {
		super.connectedCallback();
		fetchVolumesData(this.reporter, (data) => (this.volumesData = data));
		fetchReporterData(this.reporter, (data) => (this.reporterData = data));
	}

	render() {
		return html`
			<h1>${this.reporterData.short_name}</h1>
			<h2>
				${this.reporterData.full_name}
				(${this.reporterData.start_year}-${this.reporterData.end_year})
			</h2>
			Volume number:
			<ul>
				${this.volumesData
					.sort((a, b) => a.volume_number - b.volume_number)
					.map(
						(v) =>
							html`<li>
								<a
									href="/caselaw/?reporter=${this
										.reporter}&volume=${v.volume_number}"
									>${v.volume_number}</a
								>
							</li>`
					)}
			</ul>
		`;
	}
}

customElements.define("cap-reporter", CapReporter);

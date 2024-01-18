import { LitElement, html, css } from "../lib/lit.js";

export default class CapCases extends LitElement {
	static properties = {
		cases: { attribute: false, type: Array },
		reporterData: { attribute: false },
		volumeData: { attribute: false },
		reporter: { type: String },
		volume: { type: String },
	};

	constructor() {
		super();
		this.cases = [];
		this.reporterData = {};
		this.volumeData = {};
	}

	connectedCallback() {
		super.connectedCallback();
		this.fetchCasesList();
		this.fetchReporterData();
		this.fetchVolumeData();
	}

	async fetchReporterData() {
		const url = `${BUCKET_ROOT}/${this.reporter}/ReporterMetadata.json`;
		const response = await fetch(url);
		this.reporterData = await response.json();
	}

	async fetchVolumeData() {
		const url = `${BUCKET_ROOT}/${this.reporter}/${this.volume}/VolumeMetadata.json`;
		const response = await fetch(url);
		this.volumeData = await response.json();
	}

	async fetchCasesList() {
		const url = `${BUCKET_ROOT}/${this.reporter}/${this.volume}/CasesMetadata.json`;
		const response = await fetch(url);
		this.cases = await response.json();
	}

	render() {
		//todo this will need to be updated to deal with multiple cases on the same page
		return html`
			<h1>${this.volume} ${this.reporterData.short_name}</h1>
			<h2>
				${this.reporterData.full_name}
				(${this.reporterData.start_year}-${this.reporterData.end_year}) volume
				${this.volume}
			</h2>
			<ul>
				${this.cases.map(
					(c) =>
						html`<li>
							<a
								href="#!/${this.reporter}/${this.volume}/${String(
									c.first_page
								).padStart(4, "0")}"
							>
								${c.name_abbreviation},
								${c.citations.filter((c) => c.type == "official")[0].cite}
								(${c.decision_date.substring(0, 4)})
							</a>
						</li>`
				)}
			</ul>
		`;
	}
}

customElements.define("cap-cases", CapCases);

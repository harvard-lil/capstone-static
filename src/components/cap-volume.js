import { LitElement, html, css } from "../lib/lit.js";
import {
	fetchCasesList,
	fetchReporterData,
	fetchVolumeData,
} from "../lib/data.js";

export default class CapVolume extends LitElement {
	static properties = {
		casesData: { attribute: false },
		reporterData: { attribute: false },
		volumeData: { attribute: false },
		reporter: { type: String },
		volume: { type: String },
	};

	constructor() {
		super();
		this.casesData = [];
		this.reporterData = {};
		this.volumeData = {};
	}

	connectedCallback() {
		super.connectedCallback();
		fetchCasesList(
			this.reporter,
			this.volume,
			(data) => (this.casesData = data)
		);
		fetchReporterData(this.reporter, (data) => (this.reporterData = data));
		fetchVolumeData(
			this.reporter,
			this.volume,
			(data) => (this.volumeData = data)
		);
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
				${this.casesData.map(
					(c) =>
						html`<li>
							<a
								href="/caselaw/?reporter=${this.reporter}&volume=${this
									.volume}&case=${String(c.first_page).padStart(4, "0")}"
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

customElements.define("cap-volume", CapVolume);

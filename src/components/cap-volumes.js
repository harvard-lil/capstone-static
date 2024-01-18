import { LitElement, html, css } from "../lib/lit.js";

export default class CapVolumes extends LitElement {
	static properties = {
		volumes: { attribute: false },
		reporterData: { attribute: false },
		reporter: { type: String },
	};

	constructor() {
		super();
		this.volumes = [];
		this.reporterData = {};
	}

	connectedCallback() {
		super.connectedCallback();
		this.fetchVolumes();
		this.fetchReporterData();
	}

	async fetchReporterData() {
		const url = `${BUCKET_ROOT}/${this.reporter}/ReporterMetadata.json`;
		const response = await fetch(url);
		this.reporterData = await response.json();
	}

	async fetchVolumes() {
		const url = `${BUCKET_ROOT}/${this.reporter}/VolumesMetadata.json`;
		const response = await fetch(url);
		this.volumes = await response.json();
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
				${this.volumes
					.sort((a, b) => a.volume_number - b.volume_number)
					.map(
						(v) =>
							html`<li>
								<a href="#!/${this.reporter}/${v.volume_number}"
									>${v.volume_number}</a
								>
							</li>`
					)}
			</ul>
		`;
	}
}

customElements.define("cap-volumes", CapVolumes);

import { LitElement, html, css } from "../lib/lit.js";

export default class CapReporters extends LitElement {
	static properties = {
		reporters: { attribute: false },
	};

	constructor() {
		super();
		this.reporters = [];
	}

	connectedCallback() {
		super.connectedCallback();
		this.fetchReporters();
	}

	async fetchReporters() {
		const url = `${BUCKET_ROOT}/ReportersMetadata.json`;
		const response = await fetch(url);
		const data = await response.json();
		const reporters = {};
		data.forEach((element) => {
			const jurisdiction = element.jurisdictions[0].name;
			if (!reporters[jurisdiction]) {
				reporters[jurisdiction] = [];
			}
			reporters[jurisdiction].push(element);
		});
		this.reporters = reporters;
	}

	render() {
		return html`
			<ul>
				${Object.keys(this.reporters)
					.sort()
					.map(
						(jurisdiction) =>
							html`<li>
								<h2>${jurisdiction}</h2>
								<ul>
									${this.reporters[jurisdiction].map(
										(reporter) => html`<li>
											<a href="#!/${reporter.slug}">${reporter.short_name}</a>:
											${reporter.full_name}
											(${reporter.start_year}-${reporter.end_year})
										</li>`
									)}
								</ul>
							</li>`
					)}
			</ul>
		`;
	}
}

customElements.define("cap-reporters", CapReporters);

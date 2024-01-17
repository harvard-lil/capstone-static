import { LitElement, html, css } from "../lib/lit.js";
import { fetchJurisdictionsData } from "../lib/data.js";

export default class CapJurisdictions extends LitElement {
	static properties = {
		jurisdictionsData: { attribute: false },
	};

	constructor() {
		super();
		this.jurisdictionsData = [];
	}

	connectedCallback() {
		super.connectedCallback();
		fetchJurisdictionsData(this);
	}

	render() {
		return html`
			<ul>
				${Object.keys(this.jurisdictionsData)
					.sort()
					.map(
						(jurisdiction) =>
							html`<li>
								<h2>${jurisdiction}</h2>
								<ul>
									${this.jurisdictionsData[jurisdiction].map(
										(reporter) => html`<li>
											<a href="/caselaw.html?reporter=${reporter.slug}"
												>${reporter.short_name}</a
											>: ${reporter.full_name}
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

customElements.define("cap-jurisdictions", CapJurisdictions);
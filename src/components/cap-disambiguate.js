import { LitElement, html, css, nothing } from "../lib/lit.js";
import { baseStyles } from "../lib/wc-base.js";
import {
	fetchCasesList,
	fetchReporterData,
	fetchVolumeData,
	getBreadcrumbLinks,
} from "../lib/data.js";

import { isEmpty } from "../lib/isEmpty.js";
import { fetchOr404 } from "../lib/fetchOr404.js";

// The point of this component is to disambiguate between multiple
// cases when a page has been cited, but multiple cases start on that page.
// Links to this compoent are first created in the static html export, and then
// fixed up in cap-case.js.

export default class CapDisambiguate extends LitElement {
	static properties = {
		list: { type: String },
		cite: { type: String },
		casesData: { attribute: false, type: Array },
		volumeData: { attribute: false, type: Object },
		reporterData: { attribute: false, type: Object },
		reporter: { attribute: false, type: String },
		volume: { attribute: false, type: String },
	};

	constructor() {
		super();
		this.casesData = [];
		this.caseStrings = [];
		this.volumeData = {};
		this.reporterData = {};
		this.reporter = "";
		this.volume = "";
	}

	async connectedCallback() {
		super.connectedCallback();

		// This is a hack based on the assumption that all the links have the same reporter and volume.
		// Jack thinks this is a reasonable assumption, but it's worth noting that it's not guaranteed by the arguments.

		this.caseStrings = Array.from(
			this.list.split(",").filter((s) => s.length > 0),
		);

		const firstCaseString = this.caseStrings[0]; // first case in the list

		// convert that to reporter / volume / page, but we don't need the page
		const [reporter, volume, page] = Array.from(
			firstCaseString.split("/").filter((s) => s.length > 0),
		);

		this.reporter = reporter;
		this.volume = volume;

		fetchOr404(
			fetchReporterData(reporter, (data) => {
				this.reporterData = data;
			}),
			fetchVolumeData(reporter, volume, (data) => {
				this.volumeData = data;
			}),
			fetchCasesList(reporter, volume, (data) => {
				this.casesData = data;
			}),
		);
	}

	static styles = [
		baseStyles,

		css`
			p,
			ul {
				font-family: var(--font-sans-text);

				@media (min-width: 35rem) {
					font-size: var(--font-size-175);
				}
			}

			ul {
				padding: 0;
			}

			li {
				list-style-type: none;
			}

			a:link,
			a:visited,
			a:hover,
			a:active {
				text-decoration: none;
				color: var(--color-blue-400);
			}

			a:hover {
				color: var(--color-blue-500);
				text-decoration: underline;
			}

			.disambiguate {
				grid-column: 1 / -1;
				padding-inline: var(--spacing-500);
				padding-block-start: var(--spacing-400);
				padding-block-end: var(--spacing-550);
			}

			.disambiguate__headingGroup {
				margin-block-start: var(--spacing-100);
			}

			.disambiguate__heading {
				font-weight: 600;
				font-size: var(--font-size-250);
				position: relative;
			}

			.disambiguate__subHeading {
				font-size: var(--font-size-175);
				margin-block-start: var(--spacing-0);
				font-weight: 500;
			}

			.disambiguate__caseList {
				margin-block-start: var(--spacing-150);
				display: block;
			}
		`,
	];

	render() {
		if (!isEmpty(this.casesData)) {
			const cases = [];

			for (const caseString of this.caseStrings) {
				const [reporter, volume, pageAndOrdinal] = Array.from(
					caseString.split("/").filter((s) => s.length > 0),
				);

				const [page, ordinal] = pageAndOrdinal.split("-");
				const caseData = this.casesData.find((c) => {
					return (
						c.ordinal === parseInt(ordinal) &&
						c.first_page === parseInt(page).toString()
					);
				});
				cases.push(caseData);
			}

			const breadcrumbLinks = getBreadcrumbLinks(
				this.reporterData,
				this.volume,
			);
			breadcrumbLinks.push({
				name: `Page ${cases[0].first_page} disambiguation`,
				url: window.location.href,
			});

			window.document.title = `Volume: ${this.reporterData.short_name} volume ${this.volume} | Caselaw Access Project`;
			return html`
				<cap-caselaw-layout>
					<div class="disambiguate">
						<cap-breadcrumb .navItems=${breadcrumbLinks}></cap-breadcrumb>
						<hgroup class="disambiguate__headingGroup">
							<h1 class="disambiguate__heading">${this.cite}</h1>
							<p class="disambiguate__subHeading">Multiple cases match:</p>
						</hgroup>
						<ul class="disambiguate__caseList">
							${cases.map(
								(c) =>
									html`<li>
										<a
											href="/caselaw/?reporter=${this.reporter}&volume=${this
												.volume}&case=${String(c.first_page).padStart(
												4,
												"0",
											)}-${String(c.ordinal).padStart(2, "0")}"
										>
											${c.name_abbreviation},
											${c.citations.filter((c) => c.type == "official")[0].cite}
											(${c.decision_date.substring(0, 4)})
										</a>
									</li>`,
							)}
						</ul>
					</div>
				</cap-caselaw-layout>
			`;
		} else {
			return nothing;
		}
	}
}
customElements.define("cap-disambiguate", CapDisambiguate);

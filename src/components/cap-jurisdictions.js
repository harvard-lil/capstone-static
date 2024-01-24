import { LitElement, html, css } from "../lib/lit.js";
import { fetchJurisdictionsData } from "../lib/data.js";
import { baseStyles } from "../lib/wc-base.js";
import "../components/cap-page-header.js";
import "../components/cap-caselaw-layout.js";

export default class CapJurisdictions extends LitElement {
	static properties = {
		jurisdictionsData: { attribute: false },
	};

	constructor() {
		super();
		this.jurisdictionsData = [];
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

				&:hover {
					color: var(--color-blue-500);
					text-decoration: underline;
				}
			}

			.jurisdictions__header {
				grid-column: 1 / -1;
				border-bottom: 1px solid var(--color-gray-200);
			}

			.jurisdictions__description {
				font-family: var(--font-serif);
			}

			.jurisdictions__main {
				grid-column: 1 / -1;
				padding-inline: var(--spacing-500);
				padding-block-start: var(--spacing-300);
				padding-block-end: var(--spacing-550);

				@media (min-width: 60rem) {
					grid-column: 2 / -1;
				}
			}

			.jurisdiction + .jurisdiction {
				margin-block-start: var(--spacing-300);
			}

			.jurisdiction__heading {
				font-weight: 400;
				font-size: var(--font-size-250);
				position: relative;
			}

			@media (min-width: 60rem) {
				.jurisdiction__heading::before {
					content: "§";
					color: var(--color-yellow);
					position: absolute;
					font-size: 1.5rem;
					font-weight: 700;
					line-height: 1.2;
					transform: translateX(calc(-150% - 0.5rem)) translateY(45%);
				}
			}

			.jurisdiction__reporterList {
				margin-block-start: var(--spacing-100);
			}

			.jurisdiction__link {
				font-weight: 600;
			}
		`,
	];

	connectedCallback() {
		super.connectedCallback();
		fetchJurisdictionsData((data) => (this.jurisdictionsData = data));
		window.addEventListener("hashchange", this.handleHashChange.bind(this));
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("hashchange", this.handleHashChange.bind(this));
	}

	/*
	 In order to preserve encapsulation in the shadow DOM, we need to recreate
	 the ability to navigate to the anchor tags for each jurisidiction.
	 Potentially we could have rendered to the window's DOM, but that will be 
	 potentially problematic when we have to render case HTML, so I started 
	 using this pattern here.
	*/
	handleHashChange() {
		const hash = window.location.hash.substring(1); // remove the '#'
		const element = this.shadowRoot.getElementById(hash);
		if (element) {
			element.scrollIntoView();
		}
	}

	slugify(str) {
		return str
			.toLowerCase()
			.replace(/ /g, "-")
			.replace(/[^\w-]+/g, "");
	}

	render() {
		return html`
			<cap-caselaw-layout>
				<header class="jurisdictions__header">
					<cap-page-header heading="Read Caselaw" theme="light" icon="none">
						<p class="jurisdictions__description">
							Browse all volumes of the Caselaw Access Project below.
						</p>
					</cap-page-header>
				</header>
				<div class="jurisdictions__main">
					${Object.keys(this.jurisdictionsData)
						.sort()
						.map(
							(jurisdiction) =>
								html`<article
									class="jurisdiction"
									id="${this.slugify(jurisdiction)}"
								>
									<h2 class="jurisdiction__heading">${jurisdiction}</h2>
									<ul class="jurisdiction__reporterList">
										${this.jurisdictionsData[jurisdiction].map(
											(reporter) => html`<li>
												<a
													class="jurisdiction__link"
													href="/caselaw/?reporter=${reporter.slug}"
													>${reporter.short_name}</a
												>: ${reporter.full_name}
												(${reporter.start_year}-${reporter.end_year})
											</li>`
										)}
									</ul>
								</article>`
						)}
				</div>
			</cap-caselaw-layout>
		`;
	}
}

customElements.define("cap-jurisdictions", CapJurisdictions);

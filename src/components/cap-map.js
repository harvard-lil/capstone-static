import { LitElement, css, html } from "../lib/lit.js";
import { baseStyles } from "../lib/wc-base.js";
import "./accessible-map.js";
import {
	mapAbbreviations,
	mapData,
	nationalCaselawStats,
} from "../data/map.js";
import { fetchMapData } from "../lib/data.js";
import { slugify } from "../lib/slugify.js";

export class CapMap extends LitElement {
	static properties = {
		activeStats: { attribute: false },
		caselawData: { attribute: false },
	};

	constructor() {
		super();
		this.caselawData = {};
		this.activeStats = nationalCaselawStats.state;
	}

	connectedCallback() {
		super.connectedCallback();
		fetchMapData((data) => (this.caselawData = data));
	}

	static styles = [
		baseStyles,
		css`
			:host {
				color: var(--color-white);
			}

			.mapRegion {
				position: relative;
				column-gap: var(--spacing-350);
				grid-template-columns: 18rem 1fr;
				background: var(--color-gradient);
				padding-block: var(--spacing-325) var(--spacing-225);
				padding-inline: var(--spacing-150) var(--spacing-550);
				display: none;

				@media (min-width: 60rem) {
					display: grid;
				}
			}

			@media (min-width: 75rem) {
				.mapRegion {
					column-gap: var(--spacing-550);
				}
			}

			.mapRegion::after {
				--size: 25px;

				content: "";
				position: absolute;
				bottom: 0;
				left: calc(50% - var(--size));
				border-left: var(--size) solid transparent;
				border-right: var(--size) solid transparent;
				border-bottom: var(--size) solid var(--color-gray-500);
			}

			.mapRegion__accessibilityInfo {
				margin-block-start: var(--spacing-100);
				font-style: italic;
			}

			.mapRegion__tooltipToggle {
				color: var(--color-white);
				font-family: var(--font-sans-text);
				font-size: 1rem;
				background: none;
				border: none;
				cursor: pointer;
				height: 2rem; /* Minimum touch target size */
				width: auto;
			}

			.mapRegion__heading {
				font-size: var(--font-size-250);
				font-weight: 600;
			}

			.mapRegion__subheading {
				font-family: var(--font-serif);
				font-size: var(--font-size-150);
			}

			.infoBox {
				background: var(--color-gray-500);
				padding-block: var(--spacing-125) var(--spacing-275);
				padding-inline: var(--spacing-125);
				margin-block-start: var(--spacing-100);
			}

			.infoBox__heading {
				font-family: var(--font-serif);
				font-size: var(--font-size-175);
				font-weight: 400;
				letter-spacing: 1px;
				line-height: 1.2;
				border-block-end: 1px solid var(--color-white);
				padding-block-end: var(--spacing-50);
			}

			.infoBox__heading:not(:first-of-type) {
				margin-block-start: var(--spacing-325);
			}

			.infoBox__text {
				font-size: var(--font-size-175);
				letter-spacing: 0.96px;
				line-height: 1.2;
				margin-block-start: var(--spacing-125);
			}

			.infoBox__textDescriptor {
				font-family: var(--font-sans-text);
				font-size: var(--font-size-150);
				font-weight: 400;
			}
		`,
	];

	_onMapUpdate(event) {
		const target = event.target;
		this.activeState = target.activeState;

		if (!this.activeState) {
			this.activeStats = nationalCaselawStats.state;
		} else {
			this.activeStats = {
				caseCount: this.caselawData[this.activeState].case_count,
				reporterCount: this.caselawData[this.activeState].reporter_count,
				pageCount: this.caselawData[this.activeState].page_count,
			};
		}
	}

	getAbbreviationAndSlugifiedNames() {
		const mapping = {};
		for (const [abbr, data] of Object.entries(this.caselawData)) {
			mapping[abbr] = slugify(data.name_long);
		}
		return mapping;
	}

	getFormattedNumber(number) {
		return number.toLocaleString();
	}

	render() {
		return html`
			<div class="mapRegion">
				<a href="#supplemental" class="u-skipLink">Skip map</a>
				<div class="mapRegion__sidebar">
					<h2 class="mapRegion__heading">Our data</h2>
					<p class="mapRegion__subheading">
						360 years of United States caselaw
					</p>
					<div class="infoBox">
						<h3 class="infoBox__heading">
							${this.activeState
								? mapData[this.activeState].name
								: "State and Federal Totals"}
						</h3>
						<p class="infoBox__text">
							${this.getFormattedNumber(this.activeStats.caseCount)}<br /><span
								class="infoBox__textDescriptor"
								>Unique cases</span
							>
						</p>
						<p class="infoBox__text">
							${this.getFormattedNumber(
								this.activeStats.reporterCount,
							)}<br /><span class="infoBox__textDescriptor">Reporters</span>
						</p>
						<p class="infoBox__text">
							${this.getFormattedNumber(this.activeStats.pageCount)}<br /><span
								class="infoBox__textDescriptor"
								>Pages scanned</span
							>
						</p>

						<h3 class="infoBox__heading">Federal Totals</h3>
						<p class="infoBox__text">
							${this.getFormattedNumber(
								nationalCaselawStats.total.caseCount,
							)}<br /><span class="infoBox__textDescriptor">Unique cases</span>
						</p>
						<p class="infoBox__text">
							${this.getFormattedNumber(
								nationalCaselawStats.total.reporterCount,
							)}<br /><span class="infoBox__textDescriptor">Reporters</span>
						</p>
						<p class="infoBox__text">
							${this.getFormattedNumber(
								nationalCaselawStats.total.pageCount,
							)}<br /><span class="infoBox__textDescriptor">Pages scanned</span>
						</p>
					</div>

					<p class="mapRegion__accessibilityInfo">
						The caselaw map is keyboard accessible. When map is in focus, its
						states and territories can be navigated with arrow keys.
					</p>
				</div>

				<div class="mapRegion__interactiveContainer">
					<accessible-map
						width="543"
						height="432"
						.data=${mapData}
						.abbreviations=${mapAbbreviations}
						.abbreviationsAndSlugifiedNames=${this.getAbbreviationAndSlugifiedNames()}
						@map-update=${this._onMapUpdate}
					></accessible-map>
				</div>
			</div>
		`;
	}
}
customElements.define("cap-map", CapMap);

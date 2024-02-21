import { LitElement, html, css, unsafeHTML, nothing } from "../lib/lit.js";

import {
	fetchCaselawBody,
	fetchCaseMetadata,
	fetchCasesList,
} from "../lib/data.js";

import { isEmpty } from "../lib/isEmpty.js";
import { fetchOr404 } from "../lib/fetchOr404.js";

export default class CapCase extends LitElement {
	static properties = {
		caseBody: { attribute: false },
		caseMetadata: { attribute: false },
		reporter: { type: String },
		volume: { type: String },
		case: { type: String },
	};

	static styles = [
		css`
			/**/
			/* Styles for HTML under our control */
			/**/

			/* .case-container */

			.case-container {
				flex: 0 0 83.33333%;
				max-width: 83.33333%;
				margin: auto;

				padding-top: 0;
				padding-bottom: 100px;

				/*	styles inherited from "body" in capstone */

				letter-spacing: 0.01em;
				font-size: 20px;
				font-weight: normal;
				line-height: 29px;
				color: var(--color-gray-500);
				-moz-osx-font-smoothing: grayscale;
				-webkit-font-smoothing: antialiased;
				-webkit-hyphens: auto;
				-moz-hyphens: auto;
				-ms-hyphens: auto;
				hyphens: auto;
			}

			/* .case-header */

			.case-header {
				font-size: 0.9em;
				font-family: var(--font-serif-titling);
				text-align: center;
				padding: 2em 2em 0;
			}

			@media (min-width: 992px) {
				.case-header {
					padding: 0;
				}

				.case-header::after {
					content: "*";
					color: var(--color-gray-300);
				}
			}

			.case-header > h1 {
				font-family: var(--font-serif-titling);
				font-weight: 700;
				font-size: 1.3em;
				line-height: 1.4em;
				padding: 0;
				margin: 0;
			}

			.case-header .decision-date,
			.case-header .court-name {
				line-height: 1.4em;
			}

			.case-header .citations {
				line-height: 2em;
			}

			/* .metadata */

			.metadata {
				flex: 0 0 83.33333%;
				max-width: 83.33333%;
				margin: auto;
			}

			.metadata .case-name {
				flex: 0 0 66.66667%;
				max-width: 66.66667%;
				margin-left: 16.66667%;
				font-family: var(--font-serif);
				text-align: center;
			}

			.metadata .case-name .case-name-v {
				display: block;
				margin: 0.5em;
				font-style: italic;
			}

			/**/
			/* Styles that apply to the injected HTML */
			/**/

			/* .casebody */

			.casebody {
				padding-top: 1em;
			}

			.casebody section,
			.casebody article {
				flex: 0 0 83.33333%;
				max-width: 83.33333%;
				margin: auto;
				padding-top: 1em;
			}

			.casebody img {
				max-width: 100%;
				height: auto;
			}

			.casebody section {
				position: relative;
			}

			.casebody p {
				font-family: var(--font-serif);
				margin-top: 1.25rem;
				margin-bottom: 0;
			}

			.casebody p.small-text {
				font-family: var(--font-serif);
				font-size: 14px;
				font-weight: 600;
			}

			.casebody blockquote {
				font-family: var(--font-serif);
				margin-left: 0;
				padding: 0.5rem 1rem 0.5rem 1rem;
				border-left: 0.5rem solid var(--color-gray-300);
				color: var(--color-blue-500);
				font-size: 0.875rem;
				line-height: 1.5;
			}

			.head-matter > *,
			.opinion > * {
				position: relative;
			}

			section.head-matter {
				padding-bottom: 0;
				font-size: 1rem;
				line-height: 1.5;
			}

			section.head-matter p.summary,
			section.head-matter p.history,
			section.head-matter p.headnotes,
			section.head-matter p.disposition,
			section.head-matter p.syllabus,
			section.head-matter p.attorneys,
			section.head-matter aside.summary,
			section.head-matter aside.history,
			section.head-matter aside.headnotes,
			section.head-matter aside.disposition,
			section.head-matter aside.syllabus,
			section.head-matter aside.attorneys {
				margin-bottom: 0;
				margin-top: 0;
				background-color: var(--color-gray-100);
				padding: 0rem 2rem 1rem 2rem;
			}

			section.head-matter :not(.headnotes) + .headnotes:before,
			section.head-matter :not(.summary) + .summary:before,
			section.head-matter :not(.history) + .history:before,
			section.head-matter :not(.syllabus) + .syllabus:before,
			section.head-matter :not(.disposition) + .disposition:before,
			section.head-matter :not(.attorneys) + .attorneys:before {
				padding-left: 0;
				font-family: var(--font-sans-titling);
				font-weight: bold;
				color: var(--color-gray-300);
				word-break: break-all;
				text-align: left;
				font-size: 1rem;
				text-transform: uppercase;
				position: absolute;
				top: 1rem;
				content: attr(class);
			}

			section.head-matter :not(.footnote) + .footnote:before {
				padding-left: 0;
				font-family: var(--font-sans-titling);
				font-weight: bold;
				color: var(--color-gray-300);
				word-break: break-all;
				text-align: left;
				font-size: 1rem;
				text-transform: uppercase;
				position: absolute;
				top: 1rem;
				content: "Head Matter Footnotes";
			}

			section.head-matter :not(.headnotes) + .headnotes,
			section.head-matter :not(.summary) + .summary,
			section.head-matter :not(.history) + .history,
			section.head-matter :not(.syllabus) + .syllabus,
			section.head-matter :not(.disposition) + .disposition,
			section.head-matter :not(.attorneys) + .attorneys,
			section.head-matter :not(.footnote) + .footnote {
				margin-top: 1rem;
				padding-bottom: 1rem;
				padding-top: 3rem;
			}

			section.head-matter .page-label:before {
				display: none;
			}

			section.head-matter .footnote {
				margin-bottom: 0;
				margin-top: 0;
				background-color: var(--color-gray-100);
				padding: 0rem 2rem 1rem 2rem;
			}

			section.head-matter .footnote > p,
			section.head-matter footnote > blockquote {
				padding-bottom: 0.5em;
				margin-bottom: 0;
			}

			/* hidden, because this information is otherwise displayed on the page */
			.parties,
			.docketnumber,
			.decisiondate {
				display: none;
			}

			.attorneys,
			.judges {
				text-align: left;
				font-size: 1.25rem;
			}

			.author {
				font-size: 1.25rem;
				color: var(--color-purple-200);
			}

			.author:before {
				content: "Author: ";
				color: var(--color-gray-500);
			}

			.opinion {
				padding-top: 2em;
			}

			.opinion:before {
				content: "Opinion";
				font-weight: bold;
				font-family: var(--font-serif-titling);
			}

			.opinion > p {
				margin-bottom: 15px;
			}

			.footnotemark {
				border-bottom: 0;
				margin-bottom: 5px;
				color: var(--color-purple-200);
				vertical-align: super;
				font-size: 0.75rem;
				font-weight: bold;
			}

			.footnote {
				font-size: 0.875rem;
				line-height: 1.5;
				padding: 0rem 2rem 1rem 2rem;
				line-height: 1.5;
				position: relative;
			}

			.footnote > p,
			.footnote > blockquote {
				margin-bottom: 0.5em;
				margin-top: 0;
			}

			.footnote > a {
				position: absolute;
				left: 0.5rem;
				border-bottom: 0;
				font-weight: 700;
				color: var(--color-purple-200);
				font-family: var(--font-serif);
				font-size: 0.75rem;
			}

			.footnote:target {
				background-color: var(--color-pink-000);
			}

			.footnote .page-label:before {
				display: none;
				text-align: left;
			}

			.page-label {
				color: var(--color-gray-300);
				font-size: 0.8em;
				padding: 0.4em;
				font-style: italic;
			}

			.page-label:before {
				display: inline-block;
				content: attr(data-label);
				position: absolute;
				left: 0;
				transform: translateX(-100%);
				padding-right: 1em;
				font-size: 1.2rem;
			}
		`,
	];

	constructor() {
		super();
		this.caseBody = "";
		this.caseMetadata = {};
	}

	connectedCallback() {
		super.connectedCallback();
		fetchOr404(
			() =>
				fetchCaselawBody(
					this.reporter,
					this.volume,
					this.case,
					(data) => (this.caseBody = data),
				),
			() =>
				fetchCaseMetadata(
					this.reporter,
					this.volume,
					this.case,
					(data) => (this.caseMetadata = data),
				),
		);
		window.addEventListener("hashchange", this.handleHashChange.bind(this));
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("hashchange", this.handleHashChange.bind(this));
	}

	updated() {
		// if a person navigates directly to a URL with a hash, handle it on load
		this.handleHashChange();
	}

	handleHashChange() {
		const hash = window.location.hash.substring(1); // remove the '#'
		if (hash) {
			const element = this.shadowRoot.getElementById(hash);
			if (element) {
				element.tabIndex = -1;
				element.scrollIntoView();
				element.focus();
			}
		}
	}

	getYearFromDate(str) {
		const date = new Date(str);
		return date.getFullYear();
	}

	formatDate(dateStr) {
		const date = new Date(dateStr);
		const formatOptions = { timeZone: "UTC", year: "numeric" };
		if (dateStr.length > 4) formatOptions.month = "short";
		if (dateStr.length > 7) formatOptions.day = "numeric";

		return date.toLocaleDateString(undefined, formatOptions);
	}

	createCitationsString(caseCitations) {
		return caseCitations?.map((citation) => citation.cite).join(", ");
	}

	createCaseHeaderHeader(caseMetadata) {
		let decisionYear = "";
		if (caseMetadata.decision_date) {
			decisionYear = this.getYearFromDate(caseMetadata.decision_date);
		}
		return `${caseMetadata.name_abbreviation}, ${this.createCitationsString(caseMetadata.citations)} ${decisionYear ? "(" + decisionYear + ")" : ""}`;
	}

	getDecisionDate(decisionDate) {
		if (decisionDate) {
			return html`
				<span class="decision-date">${this.formatDate(decisionDate)}</span>
				<span>&middot;</span>
			`;
		} else {
			return nothing;
		}
	}

	getDocketNumber(docketNumber) {
		if (docketNumber) {
			return html`
				<span>&middot;</span>
				<span class="docket-number">${docketNumber}</span>
			`;
		} else {
			return nothing;
		}
	}

	removeLink = (a) => {
		a.replaceWith(a.innerHTML);
	};

	doNothing = () => {};

	rewriteLinks = () => {
		this.shadowRoot.querySelectorAll("a").forEach((a) => {
			const oldLink = a.getAttribute("href");
			const linkType = a.getAttribute("class");
			const casePath = a.getAttribute("data-case-paths");

			// skip links without hrefs or that point back at the same page
			if (!oldLink || oldLink.startsWith("#") || !(linkType === "citation")) {
				return;
			}

			// links without casePath are to a search page we will no longer support.
			if (!casePath) {
				this.removeLink(a);
				return;
			}

			// links that have multiple possible cases need to go to a disambiguation page
			// http://localhost:5501/caselaw/?disambiguate=%2Fill-app%2F302%2F0570-02%2C%2Fill-app%2F302%2F0570-01&cite=302%20Ill%20App%20570
			if (casePath.includes(",")) {
				const newUrl = new URL(
					`/caselaw/?disambiguate=${encodeURIComponent(casePath)}&cite=${encodeURIComponent(a.innerText)}`,
					window.location,
				);
				a.setAttribute("href", newUrl);
				return;
			} else {
				// a normal link to a single case
				const pathComponents = casePath
					.split("/")
					// remove empty strings. Deals with paths that start
					// or end with / and double slashes
					.filter((x) => x !== "");

				const [reporter, volume, page] = pathComponents;
				const newUrl = new URL(
					`/caselaw/?reporter=${reporter}&volume=${volume}&case=${page.padStart(4, "0")}`,
					window.location,
				);
				a.setAttribute("href", newUrl);
				return;
			}
		});
	};

	render() {
		if (!isEmpty(this.caseBody) && !isEmpty(this.caseMetadata)) {
			window.document.title = `${this.createCaseHeaderHeader(this.caseMetadata)} | Caselaw Access Project`;

			/*
			This render method uses requestAnimationFrame to alter the links in
			the shadow DOM once it's been rendered to change the logical links
			to cited cases in the archived html to links to the presentation
			layer version of the case.
			*/

			// Skip the first frame which is the shadow DOM render
			window.requestAnimationFrame(this.doNothing);
			// Rewrite the links on the second frame
			window.requestAnimationFrame(this.rewriteLinks);

			return html`
				<div class="case-container">
					<div class="case-header">
						<h1>${this.createCaseHeaderHeader(this.caseMetadata)}</h1>
						<div>
							${this.getDecisionDate(this.caseMetadata.decision_date)}
							<span class="court-name">${this.caseMetadata.court?.name}</span>
							${this.getDocketNumber(this.caseMetadata.docket_number)}
						</div>
						<div class="citations">
							${this.createCitationsString(this.caseMetadata.citations)}
						</div>
					</div>
					<div class="metadata">
						<div class="case-name">${this.caseMetadata.name}</div>
					</div>
					<!--section.casebody -->
					${unsafeHTML(this.caseBody)}
				</div>
			`;
		} else {
			return nothing;
		}
	}
}

customElements.define("cap-case", CapCase);

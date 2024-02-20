import { LitElement, html, css } from "../lib/lit.js";
import { baseStyles } from "../lib/wc-base.js";
import "../components/cap-nav.js";
import "../components/cap-page-header.js";
import "../components/cap-footer.js";
import "../components/cap-anchor-list.js";
import "../components/cap-media-list.js";
import { pressLinks } from "../data/pressLinks.js";
import "../components/cap-contributor-list.js";
import { anchorLinks } from "../data/aboutSidebarLinks.js";

export class CapAboutPage extends LitElement {
	static properties = {};

	constructor() {
		super();
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
				padding-inline-start: 1.8rem;
				list-style-position: outside;
			}

			li {
				list-style-type: circle;
			}

			h2 {
				font-size: var(--font-size-200);
				font-weight: 600;

				@media (min-width: 35rem) {
					font-size: var(--font-size-250);
				}
			}

			h3 {
				font-size: var(--font-size-175);

				@media (min-width: 35rem) {
					font-size: var(--font-size-200);
				}
			}

			h4 {
				font-size: var(--font-size-100);

				@media (min-width: 35rem) {
					font-size: var(--font-size-175);
				}
			}

			a:link,
			a:visited,
			a:active {
				text-decoration: none;
				color: var(--color-blue-400);
			}

			a:hover {
				color: var(--color-blue-500);
				text-decoration: underline;
			}

			.interiorMain {
				display: grid;
				grid-template-columns: repeat(4, 1fr);

				@media (min-width: 65rem) {
					max-width: 80%;
					margin-inline: auto;
					box-shadow: 0 0 27px 0 rgba(222, 222, 230, 0.46);
				}
			}

			.interiorMain__header {
				background-color: var(--color-gray-500);
				grid-column: 1 / -1;
			}

			.interiorMain__description {
				color: var(--color-white);
				font-family: var(--font-serif);
			}

			.interiorMain__aside {
				@media (max-width: 60rem) {
					display: none;
				}
			}

			.interiorMain__article {
				grid-column: 1 / -1;
				background-color: var(--color-beige);
				padding-inline: var(--spacing-500);
				padding-block-start: var(--spacing-300);
				padding-block-end: var(--spacing-550);

				@media (min-width: 60rem) {
					grid-column: 2 / -1;
				}
			}

			.interiorMain__article + .interiorMain__article {
				padding-block-start: 0;
			}

			.interiorMain__article * + * {
				margin-block-start: var(--spacing-100);

				@media (min-width: 35rem) {
					margin-block-start: var(--spacing-200);
				}
			}

			.interiorMain__decorator + * {
				margin-block-start: var(--spacing-100);
			}

			.interiorMain__decorator {
				font-weight: 400;
				color: var(--color-blue-500);
				position: relative;
			}

			.interiorMain__decorator::before {
				content: "§";
				color: var(--color-yellow);
				position: absolute;
				font-size: 1.5rem;
				line-height: 1.2;
				transform: translateX(calc(-100% - 0.5rem)) translateY(5%);
			}

			@media screen and (min-width: 35rem) {
				.interiorMain__decorator::before {
					font-size: 2rem;
					line-height: 1.5;
				}
			}

			.interiorMain__emphasis {
				color: var(--color-purple-200);
			}
		`,
	];

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener("hashchange", this.handleHashChange.bind(this));
	}

	updated() {
		// if a person navigates directly to a URL with a hash, handle it on load
		this.handleHashChange();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("hashchange", this.handleHashChange.bind(this));
	}

	/*
	 In order to preserve encapsulation in the shadow DOM, we need to recreate
	 the ability to navigate to the anchor tags for each link.
	 Potentially we could have rendered to the window's DOM, but that will be
	 potentially problematic when we have to render case HTML, so I started
	 using this pattern here.
	*/
	handleHashChange() {
		const hash = window.location.hash.substring(1); // remove the '#'
		if (hash) {
			const element = this.shadowRoot.getElementById(hash);
			if (element) {
				// wait a beat for things to draw.
				window.requestAnimationFrame(() => {});
				window.requestAnimationFrame(() => element.scrollIntoView());
			}
		}
	}

	render() {
		return html`
			<cap-nav></cap-nav>
			<main id="main" class="interiorMain">
				<header class="interiorMain__header">
					<cap-page-header heading="About">
						<p class="interiorMain__description">
							The Caselaw Access Project (“CAP”) expands public access to U.S.
							law. Our goal is to make all published U.S. court decisions freely
							available to the public online, in a consistent format, digitized
							from the collection of the Harvard Law School Library.
						</p>
					</cap-page-header>
				</header>
				<aside class="interiorMain__aside">
					<cap-anchor-list .data=${anchorLinks}></cap-anchor-list>
				</aside>
				<article class="interiorMain__article">
					<h2 class="interiorMain__decorator" id="what-data-do-we-have">
						What data do we have?
					</h2>
					<p>
						CAP includes all official, book-published state and federal United
						States case law — every volume or case designated as an official
						report of decisions by a court within the United States.
					</p>
					<p>
						Our scope includes all state courts, federal courts, and territorial
						courts for American Samoa, Dakota Territory, Guam, Native American
						Courts, Navajo Nation, and the Northern Mariana Islands.
					</p>
					<p>
						Our earliest case is from 1658, and we currently include all volumes
						published through 2020.
					</p>
					<p>
						Each volume has been converted into structured, case-level data
						broken out by majority and dissenting opinion, with human-checked
						metadata for party names, docket number, citation, and date.
					</p>
					<p>
						We also offer PDFs with selectable OCR text for each case published
						up to 2018.
					</p>
					<h2 class="interiorMain__decorator" id="data-sources">
						Data sources
					</h2>
					<h3 id="harvard-law-school-collection">
						Harvard Law School Collection
					</h3>
					<p>
						We created CAP's initial collection by digitizing roughly 40 million
						pages of court decisions contained in roughly 40,000 bound volumes
						owned by the Harvard Law School Library.
					</p>
					<p>
						The Harvard Law School Collection includes volumes published through
						2018.
					</p>
					<p>
						The Harvard Law School Collection was digitized on site at Langdell
						Hall. Members of our team created metadata for each volume,
						including a unique barcode, reporter name, title, jurisdiction,
						publication date and other volume-level information. We then used a
						high-speed scanner to produce JP2 and TIF images of every page. A
						vendor then used OCR to extract the text of every case, creating
						case-level XML files. Key metadata fields, like case name, citation,
						court and decision date, were corrected for accuracy, while the text
						of each case was left as raw OCR output. In addition, for cases from
						volumes not yet in the public domain, our vendor redacted any
						headnotes.
					</p>
					<h4>Harvard Law School Collection scope limits:</h4>
					<p>The Harvard Law School Collection does not include:</p>
					<ul>
						<li>
							Cases not designated as officially published, such as most lower
							court decisions.
						</li>
						<li>
							Non-published trial documents such as party filings, orders, and
							exhibits.
						</li>
						<li>
							Parallel versions of cases from regional reporters, unless those
							cases were designated by a court as official.
						</li>
						<li>
							Cases officially published in digital form, such as recent cases
							from Illinois, Arkansas, New Mexico, and North Carolina.
						</li>
						<li>
							Copyrighted material such as headnotes, for cases still under
							copyright.
						</li>
					</ul>
					<h3 id="fastcase-collection">Fastcase Collection</h3>
					<p>
						Our collection is augmented with yearly caselaw donations courtesy
						of
						<a href="https://www.fastcase.com/">Fastcase</a>.
					</p>
					<p>
						Fastcase provides updates, on a yearly basis, of all caselaw volumes
						published more than one year ago that is not yet in the case.law
						corpus. We currently provide Fastcase cases for volumes published
						through 2020.
					</p>
					<p>
						Fastcase volumes are delivered to us in an internal XML/HTML format,
						and we process each case to match the Harvard Law School Collection
						data formats, so researchers can write consistent code across both
						collections.
					</p>
					<h4>Fastcase Collection scope limits:</h4>
					<p>The Fastcase Collection includes only:</p>
					<ul>
						<li>
							Cases published in the reporters A.3d, B.R., Cal. Rptr. 3d, F.3d,
							F. Supp. 3d, N.E.3d, N.W.2d, P.3d, S.Ct., S.E.2d, So.3d, S.W.3d,
							and U.S.
						</li>
						<li>
							Cases published in volumes during or before {{ CASE_MAX_YEAR }}.
						</li>
						<li>
							Cases not otherwise published in the Harvard Law School
							Collection.
						</li>
					</ul>

					<p>The Fastcase Collection does not include:</p>
					<ul>
						<li>PDF page images.</li>
						<li>Copyrighted material such as headnotes.</li>
					</ul>

					<h2 class="interiorMain__decorator" id="data-quality">
						Data quality
					</h2>
					<p>
						Harvard Law School Collection data is generated by OCR from page
						scans, using ABBYY FineReader. Case metadata, such as the party
						names, docket number, citation, and date, has received human review.
						Case text and general head matter has been generated by machine OCR
						and has not received human review.
					</p>
					<h2 class="interiorMain__decorator" id="data-citation">
						Data citation
					</h2>
					<p>
						Data made available through the Caselaw Access Project API and bulk
						download service is citable. View our suggested citation in these
						standard formats:
					</p>
					<p>
						<strong class="interiorMain__emphasis">APA</strong><br />
						<span>Caselaw Access Project.</span> (2018). Retrieved [date], from
						[url].
					</p>
					<p>
						<strong class="interiorMain__emphasis">MLA</strong><br />
						The President and Fellows of Harvard University. &quot;Caselaw
						Access Project.&quot; 2018, [url].
					</p>
					<p>
						<strong class="interiorMain__emphasis">Chicago / Turabian</strong
						><br />
						Caselaw Access Project. &quot;Caselaw Access Project.&quot; Last
						modified [date], [url].
					</p>
					<p>
						Have you used Caselaw Access Project data in your research?
						<a href="/about">Tell us about it</a>.
					</p>
					<h2 class="interiorMain__decorator" id="usage-access">
						Usage and Access
					</h2>
					<p class="interiorMain__emphasis">
						<strong>
							The CAP data is free for the public to use and access.
						</strong>
					</p>
					<h2 class="interiorMain__decorator" id="press">Press</h2>
					<cap-media-list .data=${pressLinks}></cap-media-list>

					<h2 class="interiorMain__decorator" id="community-impact">
						Community Impact
					</h2>
					<p>
						The Caselaw Access Project is shown in 50+ library guides. Here are
						nearly a dozen examples!
					</p>
					<ul>
						<li>
							<a href="https://libguides.mit.edu/comptools"
								>APIs for Scholarly Resources</a
							>, Massachusetts Institute of Technology (MIT)
						</li>
						<li>
							<a href="https://libguides.asu.edu/openaccess/opendata-science"
								>Open Access</a
							>, Arizona State University
						</li>
						<li>
							<a href="https://guides.lib.utexas.edu/c.php?g=815698&p=5821508"
								>Finding Humanities Data</a
							>, University of Texas Libraries
						</li>
						<li>
							<a href="https://umb.libguides.com/PrimarySources/openaccess"
								>Primary Sources: A Research Guide</a
							>, University of Massachusetts Boston
						</li>
						<li>
							<a href="https://guides.library.umass.edu/legal/statecases"
								>Law and Legal Studies</a
							>, University of Massachusetts Amherst
						</li>
						<li>
							<a href="https://guides.lib.virginia.edu/c.php?g=515084&p=5578061"
								>Data and Statistics</a
							>, University of Virginia
						</li>
						<li>
							<a href="https://libguides.umn.edu/text-mining">Text Mining</a>,
							University of Minnesota
						</li>
						<li>
							<a href="https://libguides.princeton.edu/c.php?g=916665&p=6607543"
								>Sources of Legal and Judicial Data</a
							>, Princeton University
						</li>
						<li>
							<a
								href="https://guides.loc.gov/free-case-law/caselaw-access-project"
								>How to Find Free Case Law Online</a
							>, Library of Congress
						</li>
						<li>
							<a
								href="https://guides.library.brandeis.edu/c.php?g=633861&p=4432485"
								>Legal History</a
							>, Brandeis University
						</li>
					</ul>
					<p>
						Have questions about how to share CAP at your library, or ideas for
						how we can better support your patrons? From our library to yours,
						we're excited to hear from you. Please
						<a href="mailto:info@case.law">reach out!</a>
					</p>

					<h2 class="interiorMain__decorator" id="friends-and-partners">
						Friends and Partners
					</h2>
					<ul>
						<li>
							The Caselaw Access Project is a
							<a href="https://lil.law.harvard.edu/"
								>Harvard Law School Library Innovation Lab</a
							>
							Project.
						</li>
						<li>
							LIL is part of the
							<a href="https://hls.harvard.edu/library"
								>Harvard Law School Library</a
							>.
						</li>
						<li>
							<a href="https://cyber.law.harvard.edu">Berkman-Klein Center</a>
							cooperated with LIL on the Caselaw Access Project.
						</li>
						<li>
							<a href="https://www.ravellaw.com/">Ravel Law</a> has partnered
							with the Harvard Law School Library and LIL since the beginning of
							the Caselaw Access Project. Ravel funded the digitization effort
							and now offers free public access to the entire corpus through
							their <a href="https://home.ravellaw.com">search interface</a> and
							their
							<a href="https://home.ravellaw.com/api">non-commercial API</a>.
						</li>
						<li>
							Carl Jaeckel of
							<a href="https://www.classaction.org/">ClassAction.org</a>
							graciously donated the case.law domain name.
						</li>
						<li>
							<a href="https://www.cloudflare.com/">Cloudflare</a> has
							generously provided LIL with network services for case.law.
						</li>
					</ul>

					<h2 class="interiorMain__decorator" id="contributors">
						Contributors
					</h2>
					<cap-contributor-list></cap-contributor-list>

					<h2 class="interiorMain__decorator" id="getting-legal-help">
						Getting Legal Help
					</h2>
					<p>
						The Caselaw Access Project team cannot help with personal legal
						research problems or legal representation. Our data is valuable for
						scholarship, but it is a work in progress and is not kept up to
						date. Please do not rely on our data set to solve personal legal
						problems.
					</p>
					<p>
						Finding a lawyer: see the list of links on the Harvard Law School
						Library&#39;s page
					</p>
					<p>
						<a href="https://asklib.law.harvard.edu/faq/115265"
							>Where can I get legal advice?</a
						>
					</p>
					<p>
						Alternate databases: if you need to conduct up-to-date research for
						use in a legal proceeding, consider
						<a href="https://guides.library.harvard.edu/alternatelegaldatabases"
							>one of these alternate databases</a
						>.
					</p>
					<p>
						Learning to conduct legal research: If you have access to a
						<a href="http://www.washlaw.edu/statecourtcounty/"
							>public law library</a
						>, its librarians should be able to help you learn legal research
						skills. The Harvard Law School Library Reference Desk may also be
						able to offer assistance through their
						<a href="https://asklib.law.harvard.edu/">Ask a Librarian</a>
						service.
					</p>
				</article>
			</main>
			<cap-footer></cap-footer>
		`;
	}
}
customElements.define("cap-about-page", CapAboutPage);

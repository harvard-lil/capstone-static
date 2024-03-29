import { LitElement, html } from "../lib/lit.js";
import "../components/cap-notification-banner.js";
import "../components/cap-nav.js";
import "../components/cap-page-header.js";
import "../components/cap-footer.js";
import { AnchorListMixin } from "../components/cap-anchor-list.js";

export class CapTermsPage extends AnchorListMixin(LitElement) {
	// Turn Shadow DOM off
	// Generally discouraged: https://lit.dev/docs/components/shadow-dom/#implementing-createrenderroot
	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<a href="#main" class="u-skipLink">Skip to main content</a>
			<cap-notification-banner></cap-notification-banner>
			<cap-nav></cap-nav>
			<main id="main" class="l-interiorPage">
				<header class="u-bg-gray-500 u-col-span-full">
					<cap-page-header heading="Terms of Use">
						<p class="u-text-white u-text-serif">
							Effective: <span class="u-text-purple-200">March 13, 2024</span>
						</p>
						<p class="u-text-white u-text-serif">
							Caselaw Access Project is operated by the President and Fellows of
							Harvard College (“Harvard”) in support of its mission to educate
							and disseminate knowledge and information. As used in these Terms
							of Use, “CAP” refers to the Caselaw Access Project and to Harvard
							more generally. The “site” refers to the CAP website.
						</p>
						<p class="u-text-white u-text-serif">
							These Terms of Use constitute an agreement between you (either an
							individual or an entity, referred to herein as “you”) and CAP and
							governs your access to and use of the site.
						</p>
					</cap-page-header>
				</header>
				<aside class="u-sm-hidden">
					<cap-anchor-list .data=${this.anchorLinks}></cap-anchor-list>
				</aside>
				<article class="c-article u-bg-beige">
					<h2 class="c-decoratedHeader" id="caselaw-license">
						License to Caselaw Data and Metadata
					</h2>
					<p>
						Harvard makes the caselaw data and metadata on this site (the
						"Caselaw Data") available for public use under the CC0 1.0 Public
						Domain Designation:
					</p>
					<p>
						<a href="https://static.case.law/">Caselaw Data</a> by President and
						Fellows of Harvard College is marked with CC0 1.0 Universal
					</p>
					<p>
						The CC0 1.0 Universal license expressly disclaims any warranties.
						The data is provided "as is" and Harvard makes no representations or
						warranties of any kind concerning the status of any data included in
						the Caselaw Data that is generated by third parties.
					</p>
					<p>
						Although Harvard does not impose any legally binding conditions on
						access to the Metadata, Harvard requests that you act in accordance
						with the following Community Norms:
					</p>
					<p>
						First, Harvard requests that Harvard University and the Caselaw
						Access Project be
						<a href="/about/#data-citation">given attribution</a>
						as a source of the Caselaw Data, to the extent it is technologically
						feasible to do so.
					</p>
					<p>
						Second, Harvard requests that you make the Caselaw Data and any
						improvements thereto freely available on the same terms as Harvard
						has done, i.e., without claiming any legal right in, or imposing any
						legally binding conditions on access to, the Caselaw Data or your
						improvements, and with a request to act in accordance with these
						Community Norms.
					</p>

					<h2 class="c-decoratedHeader" id="site-license">
						License to Site Text and Source Code
					</h2>
					<p>
						Other than the Caselaw Data, the text of this site is licensed
						<a href="https://creativecommons.org/licenses/by-sa/4.0/"
							>CC BY-SA 4.0</a
						>.
					</p>
					<p>
						The
						<a href="https://github.com/harvard-lil/capstone-static"
							>source code of this site</a
						>
						is licensed under the MIT license.
					</p>

					<h2 class="c-decoratedHeader" id="compliance-with-laws">
						Compliance with Laws
					</h2>
					<p>
						You are responsible for complying with all applicable laws, rules,
						regulations and third-party rights in conjunction with your use of
						this website.
					</p>

					<h2 class="c-decoratedHeader" id="disclaimer-of-any-warranty">
						Disclaimer of Any Warranty
					</h2>
					<p>
						By using the site, you agree that the site is provided “as is” and
						your use is solely at your own discretion and risk. You agree that
						you will be solely responsible for any damage that results from your
						use of the site. You agree that CAP is not responsible for providing
						any support for your use of the site.
					</p>
					<p>
						CAP may discontinue the availability of some or all of the site, its
						features, or its services at any time for any reason.
					</p>
					<p>
						CAP makes no representations or warranties, express or implied,
						regarding the operation of the site or the content available through
						the site.
					</p>
					<p>
						To the extent permitted by law, CAP disclaims any and all
						warranties, including but not limited to the warranties of
						merchantability, fitness for a particular purpose, warranties
						regarding security, accuracy, timeliness, and performance of the
						site and content accessed through the site.
					</p>
					<h2
						class="c-decoratedHeader"
						id="release-waiver-and-limitation-of-liability"
					>
						Release, Waiver, and Limitation of Liability
					</h2>
					<p>
						To the maximum extent permitted by applicable law, you release and
						waive all claims against CAP, its subsidiaries, affiliates and
						agents from any and all liability for claims, damages, costs and
						expenses arising from or related to your use of the site.
					</p>
					<p>
						CAP shall not, under any circumstances, be liable to you for any
						indirect, incidental, consequential, special, or exemplary damages
						arising out of or in connection with the use of the site, whether
						based on breach of contract, breach of warranty, tort, or any other
						pecuniary loss, whether or not CAP has been advised of the
						possibility of such damages.
					</p>
					<p>
						Under no circumstances shall CAP be liable to you for any amount.
					</p>
					<h2 class="c-decoratedHeader" id="hold-harmless-and-indemnify">
						Hold Harmless and Indemnify
					</h2>
					<p>
						You agree that CAP will have no liability whatsoever with regard to
						any third-party claims related to your use of the site. To the
						maximum extent permitted by applicable law, you agree to hold
						harmless and indemnify CAP, its subsidiaries, affiliates and agents
						from any third-party claims, damages, liabilities, costs and fees
						(including attorney fees) arising from or related to your use of the
						site.
					</p>
					<h2 class="c-decoratedHeader" id="severability-and-integration">
						Severability and Integration
					</h2>
					<p>
						If any part of the Terms of Use is found unenforceable, the rest of
						the Terms of Use shall remain enforceable to the maximum extend of
						the law.
					</p>
					<p>
						The Terms of Use constitute the entire agreement between CAP and you
						with respect to the use of the site. The section headings and
						subheadings contained in the Terms of Use are included for
						convenience only, and shall not limit or otherwise affect the Terms
						of Use.
					</p>
					<h2 class="c-decoratedHeader" id="eligibility">Eligibility</h2>
					<p>
						You affirm that you are either more than 18 years of age, or an
						emancipated minor, or possess legal parental or guardian consent,
						and that you are fully competent to use the Site and to enter into
						and comply with these Terms of Use. In any case, you affirm that you
						are at least 13 years of age, as the Site is not intended for
						children who are under 13 years of age. Use of the Site by anyone
						under 13 years of age is not authorized.
					</p>
					<h2 class="c-decoratedHeader" id="modifications">Modifications</h2>
					<p>
						CAP reserves the right to change these Terms of Use at any time, at
						its sole discretion.
					</p>
				</article>
			</main>
			<cap-footer></cap-footer>
		`;
	}
}
customElements.define("cap-terms-page", CapTermsPage);

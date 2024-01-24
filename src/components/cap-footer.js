import { LitElement, html, css } from "../lib/lit.js";
import { baseStyles } from "../lib/wc-base.js";
import { navLinks, legalLinks } from "../data/nav.js";
import { footerLogo } from "./cap-icons.js";

import "./cap-social-group.js";

export class CapFooter extends LitElement {
	static styles = [
		baseStyles,
		css`
			.footer {
				display: grid;
				grid-row-gap: 2rem;
				justify-items: center;
				align-items: center;
				margin: 0 auto;
				background: var(--color-gray-500);
				padding-block: var(--spacing-450);
				padding-inline: var(--spacing-550);

				color: var(--color-white);
				font-family: var(--font-sans-text);

				@media (min-width: 35rem) {
					grid-template-columns: repeat(2, 1fr);
				}

				@media (min-width: 50rem) {
					grid-template-columns: repeat(4, 1fr);
					grid-row-gap: 0;
				}
			}

			.footer__list {
				padding: 0;
				list-style-type: none;
				font-size: 1.125rem;
				text-align: center;

				@media (min-width: 35rem) {
					text-align: left;
				}
			}

			.footer__textLink {
				color: inherit;
				text-decoration: none;

				&:hover {
					color: var(--color-yellow);
				}
			}

			.footer__textLink--emphasis {
				text-decoration: underline;
			}

			.footer__logo {
				grid-column: 1 / -1;
				width: 120px;

				@media (min-width: 50rem) {
					grid-column: 1;
					width: 150px;
				}

				@media (min-width: 90rem) {
					width: 225px;
				}
			}

			.footer__socialWrapper {
				grid-column: 1 / -1;

				@media (min-width: 50rem) {
					grid-column: auto;
				}
			}

			.footer__copyrightNotice {
				grid-column: 1 / -1;
				text-align: center;
				font-family: var(--font-sans-text);
				font-size: var(--font-size-100);

				@media (min-width: 50rem) {
					margin-block-start: var(--spacing-325);
					grid-row: 2;
				}
			}
		`,
	];

	render() {
		return html`
			<footer class="footer">
				<div class="footer__logo">
					<a href="https://lil.law.harvard.edu/">
						<span class="u-visuallyHidden"
							>Harvard Law School Library Innovation Lab</span
						>
						${footerLogo}
					</a>
				</div>

				<ul class="footer__list">
					${legalLinks.map(
						(link) =>
							html`<li>
								<a class="footer__textLink" href="${link.path}">${link.name}</a>
							</li>`
					)}
				</ul>

				<ul class="footer__list footer__navLinks">
					${navLinks.map(
						(link) => html` <li>
							<a class="footer__textLink" href="${link.path}">${link.name}</a>
						</li>`
					)}
				</ul>

				<div class="footer__socialWrapper">
				<cap-social-group theme="dark"></cap-social-group>
				</div>

				<p class="footer__copyrightNotice">
					Site text is licensed <a class="footer__textLink footer__textLink--emphasis" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0<a>. <a class="footer__textLink footer__textLink--emphasis" href="https://github.com/harvard-lil/capstone">Source code</a> is MIT licensed.
					Harvard asserts no copyright in caselaw retrieved from this site.
					©2024 The President and Fellows of Harvard University.
				</p>
			</footer>
		`;
	}
}

customElements.define("cap-footer", CapFooter);

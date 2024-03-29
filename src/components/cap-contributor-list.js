import { LitElement, html, css } from "../lib/lit.js";
import { baseStyles } from "../lib/wc-base.js";
import { contributorLinks } from "../data/contributors.js";

export class CapContributorList extends LitElement {
	static properties = {
		decoration: { type: String | undefined },
		theme: { type: String | undefined },
	};

	static styles = [
		baseStyles,
		css`
			:host {
				--color-link: var(--color-blue-400);
				--color-link-hover: var(--color-gray-600);
				--color-publisher: var(--color-gray-500);
				--color-date: var(--color-gray-400);
				--list-style-type: none;

				font-family: var(--font-sans-text);
			}

			.contributorList {
				font-family: var(--font-sans-text);
				list-style-position: outside;
				padding-inline-start: 1.8rem;

				@media (min-width: 35rem) {
					font-size: var(--font-size-175);
				}
			}

			.contributorList__item {
				list-style-type: circle;
				margin-block-start: var(--spacing-125);

				@media (min-width: 35rem) {
					font-size: var(--font-size-175);
				}
			}

			.contributorList__link {
				text-decoration: none;
				color: var(--color-blue-400);

				&:hover {
					color: var(--color-blue-500);
					text-decoration: underline;
				}

				@media (min-width: 35rem) {
					font-size: var(--font-size-175);
				}
			}

			.contributorList__decorator {
				color: var(--color-red);
			}
		`,
	];

	_getContributorMarkup(contributor) {
		if (contributor?.url) {
			return html`<a class="contributorList__link" href=${contributor.url}
				><span class="contributorList__name">${contributor.name}</span></a
			> `;
		} else {
			return html`<span>${contributor.name}</span>`;
		}
	}

	render() {
		const sortedContributors = contributorLinks.sort((a, b) => {
			if (a.sort_name < b.sort_name) {
				return -1;
			}
			if (a.sort_name > b.sort_name) {
				return 1;
			}
			return 0;
		});
		return html`
			<ul class="contributorList">
				${sortedContributors.map((link) => {
					return html`
						<li class="contributorList__item">
							${this._getContributorMarkup(link)}
							<span class="contributorList__decorator" aria-hidden="true"
								>→</span
							>
							<span class="contributorList__title">${link.job_title}</span>
						</li>
					`;
				})}
			</ul>
		`;
	}
}

customElements.define("cap-contributor-list", CapContributorList);

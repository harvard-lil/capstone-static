import { html, LitElement } from "../lib/lit.js";

import "./cap-cases.js";
import "./cap-case.js";
import "./cap-reporters.js";
import "./cap-volumes.js";

export default class CapContentRouter extends LitElement {
	connectedCallback() {
		super.connectedCallback();

		this.hashChangeListener = window.addEventListener("hashchange", (e) => {
			this.requestUpdate();
		});
	}

	disconnectedCallback() {
		window.removeEventListener(this.hashChangeListener);
	}

	render() {
		if (window.location.hash && window.location.hash.startsWith("#!/")) {
			// #!/$reporter/$volume/$case
			const hashComponents = window.location.hash
				.substring(3)
				.split("/")
				//collapse multiple sequential slashes
				.filter((component) => component.length > 0);

			switch (hashComponents.length) {
				case 1:
					return html`<cap-volumes
						reporter=${hashComponents[0]}
					></cap-volumes>`;
					break;
				case 2:
					return html`<cap-cases
						reporter=${hashComponents[0]}
						volume=${hashComponents[1]}
					></cap-cases>`;
					break;
				case 3:
					return html`<cap-case
						reporter=${hashComponents[0]}
						volume=${hashComponents[1]}
						case=${hashComponents[2]}
					></cap-case>`;
					break;
				default:
					return html`<cap-reporters></cap-reporters>`;
					break;
			}
		} else {
			return html`<cap-reporters></cap-reporters>`;
		}
	}
}

customElements.define("cap-content-router", CapContentRouter);

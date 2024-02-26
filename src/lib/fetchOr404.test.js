import { test, before } from "node:test";
import assert from "node:assert/strict";

import { fetchOr404 } from "./fetchOr404.js";

let newLocation = "";

const window = {
	location: {
		replace: function (url) {
			newLocation = url;
		},
		search: "foo",
	},
};

global.window = window;
global.location = window.location;

before(() => (newLocation = ""));

test("fetchOr404 works when the fetches work.", async (t) => {
	const fetches = [
		() => Promise.resolve("first fetch"),
		() => Promise.resolve("second fetch"),
	];
	await fetchOr404(...fetches);
	assert.strictEqual(newLocation, "");
});

test("fetchOr404 redirects when a fetch fails.", async (t) => {
	const fetches = [
		() => Promise.resolve("first fetch"),
		() => Promise.reject("second fetch"),
	];
	await fetchOr404(...fetches);
	assert.equal(newLocation, "./not-found/foo");
});

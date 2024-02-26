import { test } from "node:test";
import assert from "node:assert/strict";

import { slugify } from "./slugify.js";

test("slugify replaces spaces with hyphens", (t) => {
	const actual = slugify("hello world");
	const expected = "hello-world";
	assert.equal(actual, expected);
});

test("slugify replaces special characters with empty strings", (t) => {
	const actual = slugify("hello!@#$%^&*()");
	const expected = "hello";
	assert.equal(actual, expected);
});

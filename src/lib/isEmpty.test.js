import { test } from "node:test";
import assert from "node:assert/strict";

import { isEmpty } from "./isEmpty.js";

test("isEmpty returns true for empty objects", (t) => {
	const emptyObj = {};
	assert(isEmpty(emptyObj));
});

test("isEmpty returns true for empty arrays", (t) => {
	const emptyArray = [];
	assert.ok(isEmpty(emptyArray));
});

test("isEmpty returns true for empty strings", (t) => {
	const emptyString = "";
	assert.ok(isEmpty(emptyString));
});

test("isEmpty returns false for non-empty objects", (t) => {
	const nonEmptyObj = { a: 1 };
	assert.ok(!isEmpty(nonEmptyObj));
});

test("isEmpty returns false for non-empty arrays", (t) => {
	const nonEmptyArray = [1];
	assert.ok(!isEmpty(nonEmptyArray));
});

test("isEmpty returns false for non-empty strings", (t) => {
	const nonEmptyString = "a";
	assert.ok(!isEmpty(nonEmptyString));
});

test("isEmpty returns false for null", (t) => {
	assert.ok(isEmpty(null));
});

test("isEmpty throws for unsupported types", (t) => {
	assert.throws(
		() => {
			isEmpty(true);
		},
		{
			message: "Unsuported type: boolean",
		},
	);
	assert.throws(
		() => {
			isEmpty(1);
		},
		{
			message: "Unsuported type: number",
		},
	);
	assert.throws(
		() => {
			isEmpty(BigInt(9007199254740991));
		},
		{
			message: "Unsuported type: bigint",
		},
	);
	assert.throws(
		() => {
			isEmpty(Symbol("foo"));
		},
		{
			message: "Unsuported type: symbol",
		},
	);
	assert.throws(
		() => {
			isEmpty(() => {});
		},
		{
			message: "Unsuported type: function",
		},
	);
});

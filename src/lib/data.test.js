import test from "node:test";
import assert from "node:assert/strict";
import {
	fetchJurisdictionsData,
	fetchReporterData,
	fetchVolumesData,
	fetchCasesList,
	fetchCaselawBody,
	fetchCaseMetadata,
	getBreadcrumbLinks,
} from "./data.js";

global.window = { BUCKET_ROOT: "https://cap-redacted-demo.lil.tools" };

test("fetchJurisdictionsData fetches jurisdictions ", async (t) => {
	await fetchJurisdictionsData((data) => {
		assert.ok(data instanceof Object);
		assert.ok(Object.keys(data).length > 3);
		assert.ok(Object.keys(data).includes("Arkansas"));
	});
});

test("fetchReporterData can fetch metadata for a reporter", async (t) => {
	await fetchReporterData("ark", (data) => {
		assert.ok(data instanceof Object);
		assert.strictEqual(data.slug, "ark");
	});
});

test("fetchVolumeData can fetch a list of volumes", async (t) => {
	await fetchVolumesData("ark", (data) => {
		assert.ok(data instanceof Array);
		assert.ok(data.length > 100);
	});
});

test("fetchCasesList can load a list of cases", async (t) => {
	await fetchCasesList("ark", "1", (data) => {
		assert.ok(data instanceof Array);
		assert.ok(data.length > 50);
	});
});

test("fetchCaselawBody can load a case html file", async (t) => {
	await fetchCaselawBody("ark", "1", "0011-01", (data) => {
		// literal strings arent instances of String, so we have to use typeof
		assert.strictEqual(typeof data, "string");
		assert.match(data, /<section/);
	});
});

test("fetchCaseMetadata can load a case metadata file", async (t) => {
	await fetchCaseMetadata("ark", "1", "0011-01", (data) => {
		assert.ok(data instanceof Object);
		assert.strictEqual(data.name, "Goings against Mills");
	});
});

test("getBreadcrumbLinks", async (t) => {
	const reporterData = {
		slug: "ark",
		short_name: "Arkansas",
	};
	const volume = "1";
	const expected = [
		{
			url: "/caselaw/?reporter=ark",
			name: "Reporter Arkansas",
		},
		{ url: "/caselaw/?reporter=ark&volume=1", name: "Volume 1" },
	];
	const links = getBreadcrumbLinks(reporterData, volume);
	assert.deepStrictEqual(links, expected);
});

export const fetchJurisdictionsData = async (callback) => {
	const url = `${window.BUCKET_ROOT}/ReportersMetadata.json`;
	const data = await fetchJson(url);
	const jurisdictions = {};
	data.forEach((element) => {
		// skip reporters without jurisdictions for now
		if (element.jurisdictions[0]) {
			const jurisdiction = element.jurisdictions[0].name_long;
			if (!jurisdictions[jurisdiction]) {
				jurisdictions[jurisdiction] = [];
			}
			jurisdictions[jurisdiction].push(element);
		}
	});
	callback(jurisdictions);
};

export const fetchReporterData = async (reporter, callback) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/ReporterMetadata.json`;
	callback(await fetchJson(url));
};

export const fetchVolumesData = async (reporter, callback) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/VolumesMetadata.json`;
	callback(await fetchJson(url));
};

export const fetchVolumeData = async (reporter, volume, callback) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/${volume}/VolumeMetadata.json`;
	callback(await fetchJson(url));
};

export const fetchCasesList = async (reporter, volume, callback) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/${volume}/CasesMetadata.json`;
	const rawJson = await fetchJson(url);

	// This sets the ordinal property on each case to the order in which it appears on the page.
	// Usually 1 because there's only one case starting on a page.
	const combined = new Map();
	rawJson.forEach((element) => {
		if (combined.has(element.first_page)) {
			combined.get(element.first_page).push(element);
		} else {
			combined.set(element.first_page, [element]);
		}
	});
	for (const key of combined.keys()) {
		let index = 0;
		for (const element of combined.get(key)) {
			index += 1;
			element.ordinal = index;
		}
	}
	callback(rawJson);
};

export const fetchCaselawBody = async (
	reporter,
	volume,
	casePath,
	callback,
) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/${volume}/html/${casePath}.html`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Fetch failed.");
	}
	callback(await response.text());
};

export const fetchCaseMetadata = async (
	reporter,
	volume,
	casePath,
	callback,
) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/${volume}/cases/${casePath}.json`;
	callback(await fetchJson(url)); //here return {} if it didn't fetch
};

export const fetchMapData = async (callback) => {
	const url = `${window.BUCKET_ROOT}/JurisdictionsMetadata.json`;
	const data = await fetchJson(url);
	const jurisdictions = {};
	data.forEach((element) => {
		jurisdictions[element.slug] = {
			case_count: element.case_count,
			volume_count: element.volume_count,
			reporter_count: element.reporter_count,
			page_count: element.page_count,
			name_long: element.name_long,
		};
	});
	callback(jurisdictions);
};

const fetchJson = async (url) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Fetch failed.");
	}
	return await response.json();
};

export const getBreadcrumbLinks = (reporterData, volume, caseCitation) => {
	const reporterLink = {
		url: `/caselaw/?reporter=${reporterData.slug}`,
		name: `Reporter ${reporterData.short_name}`,
	};

	const volumeLink = volume
		? {
				url: `/caselaw/?reporter=${reporterData.slug}&volume=${volume}`,
				name: `Volume ${volume}`,
			}
		: null;

	const caseLink = caseCitation
		? {
				url: `.`,
				name: caseCitation,
			}
		: null;

	if (caseCitation) {
		return [reporterLink, volumeLink, caseLink];
	} else if (volumeLink) {
		return [reporterLink, volumeLink];
	}

	return [reporterLink];
};

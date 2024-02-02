export const fetchJurisdictionsData = async (callback) => {
	const url = `${window.BUCKET_ROOT}/ReportersMetadata.json`;
	const data = await fetchJson(url);
	const jurisdictions = {};
	data.forEach((element) => {
		const jurisdiction = element.jurisdictions[0].name_long;
		if (!jurisdictions[jurisdiction]) {
			jurisdictions[jurisdiction] = [];
		}
		jurisdictions[jurisdiction].push(element);
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
	const response = await fetch(url);
	callback(await response.json());
};

export const fetchCasesList = async (reporter, volume, callback) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/${volume}/CasesMetadata.json`;
	callback(await fetchJson(url));
};

export const fetchCaselawBody = async (
	reporter,
	volume,
	caseName,
	callback,
) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/${volume}/html/${caseName}.html`;
	const response = await fetch(url);
	callback(await response.text());
};

export const fetchCaseMetadata = async (
	reporter,
	volume,
	caseName,
	callback,
) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/${volume}/cases/${caseName}.json`;
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
	return await response.json();
};

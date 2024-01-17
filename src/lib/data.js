export const fetchJurisdictionsData = async (callback) => {
	const url = `${window.BUCKET_ROOT}/ReportersMetadata.json`;
	const data = await fetchJson(url);
	const jurisdictions = {};
	data.forEach((element) => {
		const jurisdiction = element.jurisdictions[0].name;
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
	callback
) => {
	const url = `${window.BUCKET_ROOT}/${reporter}/${volume}/html/${caseName}-01.html`;
	const response = await fetch(url);
	callback(await response.text());
};

const fetchJson = async (url) => {
	const response = await fetch(url);
	return await response.json();
};

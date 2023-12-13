export const fetchJurisdictionsData = async (target) => {
	const url = `${BUCKET_ROOT}/ReportersMetadata.json`;
	const data = await fetchJson(url);
	const jurisdictions = {};
	data.forEach((element) => {
		const jurisdiction = element.jurisdictions[0].name;
		if (!jurisdictions[jurisdiction]) {
			jurisdictions[jurisdiction] = [];
		}
		jurisdictions[jurisdiction].push(element);
	});
	target.jurisdictionsData = jurisdictions;
};

export const fetchReporterData = async (reporter, target) => {
	const url = `${BUCKET_ROOT}/${reporter}/ReporterMetadata.json`;
	target.reporterData = await fetchJson(url);
};

export const fetchVolumesData = async (reporter, target) => {
	const url = `${BUCKET_ROOT}/${reporter}/VolumesMetadata.json`;
	target.volumesData = await fetchJson(url);
};

export const fetchVolumeData = async (reporter, volume, target) => {
	const url = `${BUCKET_ROOT}/${reporter}/${volume}/VolumeMetadata.json`;
	const response = await fetch(url);
	target.volumeData = await response.json();
};

export const fetchCasesList = async (reporter, volume, target) => {
	const url = `${BUCKET_ROOT}/${reporter}/${volume}/CasesMetadata.json`;
	target.casesData = await fetchJson(url);
};

export const fetchCaselawBody = async (reporter, volume, caseName, target) => {
	const url = `${BUCKET_ROOT}/${reporter}/${volume}/html/${caseName}-01.html`;
	const response = await fetch(url);
	target.caseBody = await response.text();
};

const fetchJson = async (url) => {
	const response = await fetch(url);
	return await response.json();
};

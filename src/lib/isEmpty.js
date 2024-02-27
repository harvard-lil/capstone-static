export const isEmpty = (obj) => {
	if (obj === null || obj === undefined) {
		return true;
	} else if (Array.isArray(obj) || typeof obj === "string") {
		return obj.length === 0;
	} else if (
		["boolean", "number", "bigint", "symbol", "function"].includes(typeof obj)
	) {
		throw new Error(`Unsupported type: ${typeof obj}`);
	} else {
		return Object.keys(obj).length === 0;
	}
};

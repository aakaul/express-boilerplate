export default class StringUtil {
	static isString(data: string) {
		return typeof data == "string";
	}
	static capitalFirstLetter(word: string): string {
		if (typeof word !== "string") {
			return "";
		}
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}
	static randomStringGenerator(length?: number) {
		if (!length) length = 6;
		return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
	}

	static escapeSingleQuotes(data: any) {
		if (typeof data == "string" && !StringUtil.isJsonString(data)) {
			data = data.replace(/'/g, "\\'");
		}
		return data;
	}
	static isJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	static firstToLowerCase(str: string) {
		return str.substr(0, 1).toLowerCase() + str.substr(1);
	}
}

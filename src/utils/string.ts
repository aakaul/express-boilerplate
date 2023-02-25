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

	static nextNo(invoiceNo: string) {
		const regex = new RegExp(/\d+/g);
		const m = invoiceNo.match(regex);
		const lastNumber = m ? m.pop() : 0;
		let x;
		let parsedNumber;
		let parsedNumberStr;
		let prevNoLength;
		let currentNoLength;
		let prefix = "";
		let prefLastChar = "";

		parsedNumber = ~~lastNumber;
		parsedNumberStr = parsedNumber + "";
		x = parsedNumber + 1;

		prefix = invoiceNo.substring(0, invoiceNo.lastIndexOf(parsedNumberStr));

		prevNoLength = (x - 1 + "").length;
		currentNoLength = (x + "").length;
		if (currentNoLength > prevNoLength) {
			if (prefix.length > 0) {
				prefLastChar = prefix.substring(prefix.length - 1);
				if (prefLastChar === "0") {
					prefix = prefix.substring(0, prefix.length - 1);
				}
			}
		}
		return prefix + x;
	}

	static camelCasing(data: any) {
		Object.keys(data).map((key) => {
			let splitKeys = (key || "").split("_");
			if (splitKeys.length > 1) {
				const newKey = splitKeys
					.map((word, i) => {
						if (i > 0) {
							return word[0].toUpperCase() + word.slice(1);
						} else {
							return word;
						}
					})
					.join("");
				data[newKey] = data[key];
				delete data[key];
			}
		});
		return data;
	}
}

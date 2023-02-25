export class SystemUtils {
	public static sleep(milliseconds: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, milliseconds);
		});
	}

	public static execRegexString(
		regexQuery: string,
		content: string,
		defaultValue: string,
	): string {
		const regex: RegExp = new RegExp(regexQuery, "g");
		const regexResult = regex.exec(content);
		if (regexResult && regexResult.length > 0) {
			return regexResult[0];
		}
		return defaultValue;
	}

	public static isNullOrUndefinedOrEmpty(value: any): boolean {
		if (value === null || value === undefined) {
		  	return true;
		} else if (typeof value === 'string') {
			return value.trim() === '';
		}
		return false;
	}

}
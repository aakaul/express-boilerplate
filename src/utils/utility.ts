
export class Utility {
	static isNullOrUndefinedOrEmpty(value: any): boolean {
		if (value === null || value === undefined) {
			return true;
		} else if (typeof value === "string") {
			return value.trim() === "";
		}
	}

	static isNotNullOrUndefinedOrEmpty(value: any): boolean {
		return !Utility.isNullOrUndefinedOrEmpty(value);
	}

	static isNotNullOrUndefinedOrEmptyOrNaN(value: any): boolean {
		return !Utility.isNullOrUndefinedOrEmpty(value) && !isNaN(value);
	}

	static loadBase64Image(uploadedFile: File, callback: ([boolean, any]) => void) {
		const reader = new FileReader();
		reader.onload = function (e) {
			callback([true, reader.result]);
		};
		reader.readAsDataURL(uploadedFile);
	}

	static fixWebsiteUrl(website: string): string {
		let text = website.toLowerCase();
		if (text.indexOf("http://") === 0 || text.indexOf("https://") === 0) {
			return text;
		}
		return (text = "http://" + text);
	}

	static delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	static scrollToTarget(selected) {
		selected.nativeElement.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",
		});
	}

	static isGuidValidator(stringToTest: string): boolean {
		if (stringToTest[0] === "{") {
			stringToTest = stringToTest.substring(1, stringToTest.length - 1);
		}
		const regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
		return regexGuid.test(stringToTest);
	}

	static isEmptyGuid(guid: string) {
		return guid === "00000000-0000-0000-0000-000000000000";
	}

	static arrayToObject<T>(array: T[], key: string): Record<string, T> {
		return array.reduce((obj, item) => {
			obj[item[key]] = item;
			return obj;
		}, {});
	}

	static dateToDDMMYYY(date: number, seperator?: string) {
		if (!seperator) seperator = "/";
		const d = new Date(date);
		const dd = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
		const mm = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
		const yyyy = d.getFullYear();
		return dd + seperator + mm + seperator + yyyy;
	}

	static gstStateCodes(stateCheck) {
		let stateCodes = {
			"JAMMU AND KASHMIR": "01",
			"HIMACHAL PRADESH": "02",
			PUNJAB: "03",
			CHANDIGARH: "04",
			UTTARAKHAND: "05",
			HARYANA: "06",
			DELHI: "07",
			RAJASTHAN: "08",
			"UTTAR PRADESH": "09",
			BIHAR: "10",
			SIKKIM: "11",
			"ARUNACHAL PRADESH": "12",
			NAGALAND: "13",
			MANIPUR: "14",
			MIZORAM: "15",
			TRIPURA: "16",
			MEGHALAYA: "17",
			ASSAM: "18",
			"WEST BENGAL": "19",
			JHARKHAND: "20",
			ODISHA: "21",
			CHHATTISHARG: "22",
			"MADHYA PRADESH": "23",
			GUJARAT: "24",
			"DAMAN AND DIU": "25",
			"DADRA AND NAGAR HAVELI": "26",
			MAHARASHTRA: "27",
			KARNATAKA: "29",
			GOA: "30",
			LAKSHADWEEP: "31",
			KERALA: "32",
			"TAMIL NADU": "33",
			PUDUCHERRY: "34",
			"ANDAMAN AND NICOBAR ISLANDS": "35",
			TELANGANA: "36",
			"ANDHRA PRADESH": "37",
			LADAKH: "38",
			"OTHER TERRITORY": "97",
		};
		let stateCode = stateCodes[stateCheck] || "";
		return stateCode;
	}

	static removeUndefinedNullFromObj(data: any) {
		if (typeof data == "object" && data !== null) {
			for (const k in data) {
				const value = data[k];
				if (
					typeof value == "undefined" ||
					value == null ||
					value === "" ||
					Object.is(value, NaN)
				) {
					delete data[k];
					continue;
				}
				if (
					typeof value == "object" &&
					value !== null &&
					!(value instanceof Array)
				) {
					Utility.removeUndefinedNullFromObj(value);
					continue;
				}
				if (value instanceof Array) {
					for (let i = 0; i < value.length; i++) {
						Utility.removeUndefinedNullFromObj(value[i]);
					}
					continue;
				}
			}
			return data;
		} else {
			return data;
		}
	}

	static convertUndefinedToNull(data: any) {
		if (typeof data == "object" && data !== null) {
			for (const k in data) {
				const value = data[k];
				if (
					typeof value == "undefined" ||
					value == null ||
					value === "" ||
					Object.is(value, NaN)
				) {
					data[k] = null;
					continue;
				}
				if (
					typeof value == "object" &&
					value !== null &&
					!(value instanceof Array)
				) {
					Utility.removeUndefinedNullFromObj(value);
					continue;
				}
				if (value instanceof Array) {
					for (let i = 0; i < value.length; i++) {
						Utility.removeUndefinedNullFromObj(value[i]);
					}
					continue;
				}
			}
			return data;
		} else {
			return data;
		}
	}

    static flatten(arr) {
        let res = [];

        function flat(params) {
            params.map(x=>{
                if(Array.isArray(x)) return flat(x)
                res.push(x)
            })
        }

        flat(arr)

        return res;
    }

}

import { isArray } from "class-validator";

export class Utility {
	static isNullOrUndefinedOrEmpty(value: any): boolean {
		if (value === null || value === undefined) {
			return true;
		} else if (typeof value === "string") {
			return value.trim() === "";
		}
	}

	static createArrayChunks(array: any[], chunkSize: number) {
		return [].concat.apply(
			[],
			array.map(function (elem, i) {
				return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
			})
		);
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

	static formatMultiSelectDropdownValues(dropDown: string | string[]): string | string[] {
		if (typeof dropDown === "string") {
			dropDown = (dropDown || "").split(", ");
			return dropDown;
		} else {
			return dropDown;
		}
	}

	static multiDropDownToString(dropDown: string[]): string {
		if (!dropDown.length) {
			return "";
		}
		const formattedDropDown = dropDown.join(", ");
		return formattedDropDown;
	}

	static firstCharacterToCapital(word: string): string {
		if (typeof word !== "string") {
			throw new Error("Input parameter needs to be a string");
		}
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}

	static delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	static getOnlyDateString(date: Date | string): string {
		if (this.isNullOrUndefinedOrEmpty(date)) {
			return null;
		}
		if (typeof date === "string") {
			return date;
		}
		return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
	}

	static convertToLocalTime(date: Date) {
		return new Date(
			Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
		);
	}

	static scrollToTarget(selected) {
		selected.nativeElement.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",
		});
	}

	static abbreviateUserName(userName: string): string {
		return (userName || "")
			.split(" ")
			.map((name, nameIndex) => {
				if (nameIndex === 0) {
					return name.charAt(0).toUpperCase();
				} else {
					return `.${name.charAt(0).toUpperCase()}${name.slice(1)}`;
				}
			})
			.join("")
			.trim();
	}

	// This utility function will going to accept any kind of object array so that it can make the present text bold
	static makeObjectSearchTextBold(data: any[], searchedText: string, properties: string[]) {
		if (this.isNotNullOrUndefinedOrEmpty(data)) {
			data.forEach((element) => {
				properties.forEach((property) => {
					if (element.hasOwnProperty(property)) {
						element[property] = this.makeSearchTextBold(element[property], searchedText);
					}
				});
			});
		}
	}

	static makeSearchTextBold(value: string, searchedText: string): string {
		if (searchedText && value) {
			value = String(value); // make sure its a string
			const startIndex = value.toLowerCase().indexOf(searchedText.toLowerCase());
			if (startIndex !== -1) {
				const endLength = searchedText.length;
				const matchingString = value.substr(startIndex, endLength);
				return value.replace(matchingString, `<b>${matchingString}</b>`);
			}
		}
		return value;
	}

	static checkIfLockedByCurrentUser(lockList, selectedKey: string): boolean {
		let isLockedByCurrentUser = false;
		lockList.forEach((item) => {
			if (item.itemRefKey === selectedKey && item.userName) {
				isLockedByCurrentUser = true;
			}
		});
		return isLockedByCurrentUser;
	}

	static isGuidValidator(stringToTest: string): boolean {
		if (stringToTest[0] === "{") {
			stringToTest = stringToTest.substring(1, stringToTest.length - 1);
		}
		const regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
		return regexGuid.test(stringToTest);
	}

	static getCommaSeperatedString(stringArray: string[]): string {
		if (!stringArray.length) {
			return "";
		}
		const formattedString = stringArray.join(", ");
		return formattedString;
	}

	static divide(numerator: number, denominator: number): number {
		try {
			return numerator / denominator;
		} catch {
			return NaN;
		}
	}

	static isEmptyGuid(guid: string) {
		return guid === "00000000-0000-0000-0000-000000000000";
	}

	static getQuarters() {
		const quarters = new Array<string>();
		const day = new Date();
		let year = day.getFullYear();
		const month = day.getMonth();
		let quarter = Math.floor(month / 3) + 1;
		for (let i = 0; i < 8; i++) {
			quarters.push(year + " Q" + quarter);
			if (i < 8) {
				quarter--;
			}
			if (quarter === 0) {
				quarter = 4;
				year--;
			}
		}
		quarters.push("View All Quarters");
		return quarters;
	}

	static wasScanned(searchText: string) {
		return searchText.startsWith("^!");
	}

	static isValidDate(date: any) {
		if (Object.prototype.toString.call(date) === "[object Date]") {
			// it is a date
			if (isNaN(date.getTime())) {
				// d.valueOf() could also work
				// date is not valid
				return false;
			} else {
				// date is valid
				return true;
			}
		} else {
			const parsedDate = Date.parse(date);
			return isNaN(date) && !isNaN(parsedDate) ? true : false;
		}
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

	static getToAndFromFn(type: string, days: number = 0): {fromDate:number,toDate:number} {
		const today = Date.now();
		const timeStampinOneDay = 86400000;
		const fromObject = {
			Week(d: number) {
				const date = new Date(today);
				const day = date.getDay() || 7;
				if (day !== 1) date.setHours(-24 * (day - 1));
				return +new Date(date);
			},

			Today: (d: number) => +new Date(today).setHours(0, 0, 0, 0),

			Month: (d: number) => +new Date(new Date().setDate(1)).setHours(0, 0, 0, 0),

			Quarter(d: number) {
				const date = new Date();
				const setQuaterMonth = date.setMonth(date.getMonth() - (date.getMonth() % 3), 1);
				return new Date(setQuaterMonth).setHours(0, 0, 0, 0);
			},

			Year: (d: number) =>
				new Date().getMonth() > 3
					? +new Date(new Date().getFullYear(), 3, 1)
					: +new Date(new Date().getFullYear() - 1, 3, 1),

			Custom: (days: number) => +new Date(Date.now() - days * timeStampinOneDay),
		};
		return {
			fromDate: fromObject[type](days),
			toDate: today,
		};
	}

	static hash(str: string) {
		let hash = 0,
			char;
		if (str.length == 0) {
			return "" + hash;
		}
		for (var i = 0; i < str.length; i++) {
			char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash + "";
	}

	static shorturlHash(str: string) {
		let hash = 0,
			char;
		if (str.length == 0) {
			return hash;
		}
		for (var i = 0; i < str.length; i++) {
			char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return (hash + "").slice(-2);
	}

	static newKeys(data: any) {
		let Arr = [];
		if (Array.isArray(data)) {
			data.map((x) => {
				Arr.push(this.camelCasing(x));
			});
			return Arr;
		} else {
			return this.camelCasing(data);
		}
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

	static fixAllNumbers(data) {
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				if (data[key] !== null && typeof data[key] === "object") {
					data[key] = this.fixAllNumbers(data[key]);
				} else {
					let value = data[key];
					if (typeof value == "number") {
						if (value % 1 != 0) {
							data[key] = +value.toFixed(2);
						}
					} else if (this.isNumeric(value)) {
						if (value.includes(".")) {
							data[key] = (+value).toFixed(2);
						} else {
							data[key] = +value;
						}
					}
				}
			}
		}
		return data;
	}

	static isNumeric = (num: any) =>
		(typeof num === "number" || (typeof num === "string" && num.trim() !== "")) && !isNaN(num as number);

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

    static capitalFirstLetter(data:string){
    	if(!data) return ""
    	data = data.trim()
    	return data[0].toUpperCase()+data.substr(1)
	}

	static createdStampCompareFn(){
		return (a,b)=>b.createdStamp-a.createdStamp;
	}
}

import { ValueTransformer } from "typeorm";
import { Constants } from "./Contants";

export default class NumberUtil {
	static converToNumber(data: string) {
		return +data;
	}
	static floor(data: number) {
		return data | 0;
	}
	static roundTwoDecimals(data: number) {
		try {
			return Number(data.toFixed(2));
		} catch {
			return 0;
		}
	}
	static ceiling(data: number) {
		return data | 1;
	}
	static randomNumber(length: number) {
		if (!length) length = 6;
		return Math.floor(Math.random() * Math.floor(length));
	}

	static pow(number: number, power: number) {
		return number ** power;
	}

	static multiply(a: number, b: number) {
		return a * b;
	}
	static multiplyBy100(a: number) {
		return NumberUtil.multiply(a, 100);
	}
	static divid(a: number, b: number) {
		return a / b;
	}
	static dividBy100(a: number) {
		return NumberUtil.divid(a, 100);
	}

	static add(...args: number[]) {
		return args.reduce((acc, cur) => (acc += cur), 0);
	}
	static sub(a: number, b: number) {
		return a - b;
	}

	static bigintTransformerTypeOrm: ValueTransformer = {
		to: (entityValue: number) =>  {
			if (isNaN(entityValue)) {
				return null
			}
			return parseInt(String(entityValue/1000),10)
		},
		from: (databaseValue: string): number => {
			if (isNaN(databaseValue as any)) {
				return null
			}
			return parseInt(databaseValue, 10) * 1000 
		}
	}

	
	static eodTransformerTypeOrm: ValueTransformer = {
		to: (entityValue: number) =>  parseInt(String(Constants.getLastStampToday(entityValue)/1000),10)||null,
		from: (databaseValue: string): number => parseInt(databaseValue, 10) * 1000 || null
	}
	
}

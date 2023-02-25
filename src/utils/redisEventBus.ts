import { EventEmitter } from "events";
import { inspect } from "util";
import { RedisInstance } from "../instances/redis";

//outside the scope of class and instances

export class RedisEventBus {
	constructor() {}

	static next<T>(name: string, data: T) {
		RedisInstance.getPubInstance().publish(name, JSON.stringify(data));
		return;
	}

	static subscribe(name: string, cb: (...data: any) => any) {
		RedisInstance.getSubInstance(name).on("message", (_, data) => {
			let passData = JSON.parse(data);
			cb([passData]);
		});
	}
}

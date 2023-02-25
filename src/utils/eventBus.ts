import { EventEmitter } from "events";

//outside the scope of class and instances
const emitter = new EventEmitter();

export class EventBus {
	constructor() {}

	static next<T>(name: string, data: T) {
		emitter.emit(name, data);
		return;
	}

	static subscribe(name: string, cb: (...data: any) => any) {
		 emitter.on(name, (...data) => cb(data));
	}

}

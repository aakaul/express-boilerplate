import Redis from "ioredis";
import config from "config";

export class RedisInstance {
	static instance: Redis.Redis;
	static subInstance: Redis.Redis;
	static pubInstance: Redis.Redis;
	constructor() {
		const rdConfig = {
			port: config.get<number>("RD.port"),
			host: config.get<string>("RD.host"),
			password: config.get<string>("RD.password"),
		};
		RedisInstance.instance = new Redis(rdConfig);
		RedisInstance.subInstance = new Redis(rdConfig);
		RedisInstance.pubInstance = new Redis(rdConfig);
	}

	static getInstance() {
		return RedisInstance.instance;
	}
	static redisSubs = {};
	static getSubInstance(name?: string) {
		if (name && !this.redisSubs[name]) {
			RedisInstance.subInstance.subscribe(name, (err) => {
				if (err) {
					console.error("Failed to subscribe: %s", err.message);
				} else {
					this.redisSubs[name] = true;
				}
			});
		}
		return RedisInstance.subInstance;
	}

	static getPubInstance() {
		return RedisInstance.pubInstance;
	}
}

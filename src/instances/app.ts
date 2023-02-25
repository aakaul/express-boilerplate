import { Service } from "typedi";
import { Express } from "express";

@Service()
export class App {
	private static _instance: Express;

	static setInstance(instance: Express) {
		App._instance = instance;
	}

	static getInstance() {
		return App._instance;
	}
}

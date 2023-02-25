import { Service } from "typedi";
import { NodeCacheCustom } from "../utils/nodeCache";
@Service()
export class NodeCacheCustomInstance {
	private static _instance: NodeCacheCustom;

	static setInstance(instance: NodeCacheCustom) {
		NodeCacheCustomInstance._instance = instance;
	}

	static getInstance() {
		return NodeCacheCustomInstance._instance;
	}
}

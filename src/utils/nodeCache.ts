import NodeCache from "node-cache";

export class NodeCacheCustom extends NodeCache {
	get<T>(key: NodeCache.Key): T {
		return super.get(key);
	}

	del(keys: NodeCache.Key | NodeCache.Key[]): number {
		return super.del(keys);
	}

	set<T>(key: NodeCache.Key, value: T, ttl: string | number): boolean;
	set<T>(key: NodeCache.Key, value: T): boolean;
	set(key: any, value: any, ttl?: any): boolean {
		return super.set(key, value, ttl);
	}
}

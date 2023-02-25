import { Pool } from "../utils/mysqlPool";
import typeOrmConfig from "../config/typeOrm.config";

export class MysqlPool {
	static instance: Pool;
	constructor() {
		MysqlPool.instance = new Pool(
			typeOrmConfig.host,
			typeOrmConfig.username,
			typeOrmConfig.password,
			typeOrmConfig.database
		);
	}

	static getInstance() {
		return MysqlPool.instance;
	}
}

import * as path from "path";
import config from "config";

export default {
	type: "mysql",
	host: config.get<string>("DB.host"),
	port: config.get<number>("DB.port"),
	username: config.get<string>("DB.user"),
	password: config.get<string>("DB.password"),
	database: config.get<string>("DB.database"),
	entities: [path.resolve("dist/routes/api/**/*.model.js"), path.resolve("dist/shared/static/models/**/*.model.js")],
	synchronize: config.get<boolean>("DB.synchronize"),
	logging: config.get<boolean>("DB.logging"),
	multipleStatements: true,
	extra: {
		connectionLimit: config.get<number>("DB.connectionLimit"),
	},
};

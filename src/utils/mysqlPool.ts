import * as mysql from "mysql";

let poolArr: any = {};

export class Pool {
	connection: any;

	queryStatment = "";
	constructor(host: string, user: string, password: string, database: string) {
		if (!poolArr[user + "|" + database]) {
			poolArr[user + "|" + database] = mysql.createPool({
				connectionLimit: 20,
				host,
				user,
				password,
				database,
				multipleStatements: true,
			});
		}
		this.connection = poolArr[user + "|" + database];
	}

	queryAsync(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.connection.query(query, function (error: any, results: any, fields: any) {
				if (error) {
					reject(
						new Error(
							"-------------------------------s:db error--------------------------------------------" +
								error.sqlMessage +
								"------------------------------e:db error--------------------------------------------" +
								"------------------------------s:db error qury---------------------------------------" +
								query +
								"------------------------------e:db error query--------------------------------------"
						)
					);
				}
				resolve(results);
			});
		});
	}

	query(query: string) {
		this.connection.query(query, function (error: any, results: any, fields: any) {});
	}
}

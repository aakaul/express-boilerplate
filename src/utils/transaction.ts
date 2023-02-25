import { getConnection, QueryRunner, Repository } from "typeorm";

export class Transaction<T> {
	queryRunner: QueryRunner;
	constructor(private repo?: Repository<T>) {
		const manager = repo?.manager || getConnection().manager;
		this.queryRunner = manager.connection.createQueryRunner();
	}
	start() {
		this.queryRunner.startTransaction();
		return this;
	}
	commit() {
		this.queryRunner.commitTransaction();
	}
	rollBack() {
		this.queryRunner.rollbackTransaction();
	}

	get manager() {
		return this.queryRunner.manager;
	}
}

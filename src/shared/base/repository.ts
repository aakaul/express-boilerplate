import { DeepPartial, FindConditions, FindManyOptions, In, IsNull, Not, ObjectLiteral, Repository } from "typeorm";
import { ModelObject } from "../../utils/types";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BaseModel } from "./model";
import { Constants } from "../../utils/Contants";
import { IRepository } from "../interface/baseRepository.interface";
import { ArrayUtils } from "../../utils/Arrays";
import { Transaction } from "../../utils/transaction";
import { InternalServerError } from "routing-controllers";


export abstract class BaseRepository<K extends IRepositoryEssentialKeys> implements IRepository<K> {
	protected abstract repo: Repository<K>;

	getAll(data: FindConditions<K>[] | FindConditions<K> | ObjectLiteral, withDeletedAt = false) {
		return this.repo.find({
			where: {
				...data,
			},
			withDeleted:withDeletedAt
		});
	}

	getByIds(data:number[],options?: FindManyOptions<K>){
        return this.repo.findByIds(data,options)
    }

	get transaction() {
		return new Transaction(this.repo);
	}

	async saveTransaction(
		data: DeepPartial<K> | DeepPartial<K>[] | K |K[],
		transaction: Transaction<K>
	) {
		try {
			data = ArrayUtils.convertToArray(data) as any;
			const result = await transaction.manager.save(data);
			return result;
		} catch (err) {
			transaction.rollBack();
			throw new InternalServerError("unable to save data");
		}
	}


	get(data: FindConditions<K> | FindConditions<K>[], select?: (keyof K)[], withDeletedAt = false) {
		data = ArrayUtils.convertToArray(data) as FindConditions<K>[];
		const findObj: any = {
			where: data.map((x) => ({
				...x,
			})),
			withDeleted:withDeletedAt,
		};
		if (select?.length) {
			findObj.select = select;
		}
		return this.repo.find(findObj);
	}

	getOne(data: FindConditions<K>,select?: (keyof K)[],  withDeletedAt = false) {
		const findObj: any = {
			where: {
				...data,
			},
			withDeleted:withDeletedAt,
		};
		if (select?.length) {
			findObj.select = select;
		}
		return this.repo.findOne(findObj);
	}

	async save(data: DeepPartial<K> | DeepPartial<K>[]) {
		if (!Array.isArray(data)) {
			data = [data];
		}
		let result = await this.repo.save(data);
		return result;
	}

	update(data: QueryDeepPartialEntity<K>, cond: FindConditions<K>) {
		return this.repo.update(cond, data);
	}

	softDelete(uuid: string|string[]) {
		uuid = ArrayUtils.convertToArray(uuid) as string[];
		return this.update(
			{
				deletedAt: Constants.currMillis(),
				deletedAtVirtual: Constants.currMillis(),
			} as any,
			{ uuid: In(uuid) as any}
		);
	}

	softDeleteWhere(cond: FindConditions<K>) {
		return this.update(
			{
				deletedAt: Constants.currMillis(),
				deletedAtVirtual: Constants.currMillis(),
			} as any,
			cond
		);
	}
}

export interface IRepositoryEssentialKeys {
	id: number;
	uuid: string;
}

import { IsNumber, IsOptional, IsString, validate, ValidationError } from "class-validator";
import { BadRequestError } from "routing-controllers";
import { Utility } from "../../utils/utility";
import { Column, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert, Generated, DeleteDateColumn } from "typeorm";
import { Constants } from "../../utils/Contants";
import NumberUtil from "../../utils/number";
import { Expose } from "class-transformer";

export class BaseModel {
    constructor(){}

    @PrimaryGeneratedColumn()
    @IsNumber()
    @Expose()
    id: number;
    
    @IsString()
    @Column()
    @Expose()
    @Generated("uuid")
    uuid:string;

    @Column({name:"created_at",type:"int",  transformer: [NumberUtil.bigintTransformerTypeOrm],width:12 })
    @IsNumber()
    @Expose()
    createdAt:number;

    @Column({name:"updated_at",type:"int",transformer: [NumberUtil.bigintTransformerTypeOrm],nullable:true,width:12})
    @IsNumber()
    @IsOptional()
    @Expose()
    updatedAt?:number;

    @IsNumber()
    @Expose()
	@DeleteDateColumn({name:"deleted_at",type:"int",transformer: [NumberUtil.bigintTransformerTypeOrm],nullable:true,width:12})
    @IsOptional()
    deletedAt?:number;

    @IsNumber()
	@Column({name:"deleted_at_virtual",type:"int",transformer: [NumberUtil.bigintTransformerTypeOrm],default:0,nullable:true,width:12})
    @IsOptional()
    deletedAtVirtual:number;
    

    @BeforeInsert()
    createdStamps() {
        this.createdAt = Constants.currMillis();
    }

    @BeforeUpdate()
    updateStamps() {
        this.updatedAt = Constants.currMillis();
    }

    updatedBy?:number;

    createdBy:number;


    setUpdatedBy(id:number){
        this.updatedBy=id
        return this;
    }


    setCreatedBy(id:number){
        this.createdBy=id;
        return this;
    }

    public async isValid(data?:{skipMissingProperties?:boolean}): Promise<boolean> {
		try {
			const errors: ValidationError[] = await validate(this, {
				validationError: { target: false, value: false },
            });
			if (errors.length > 0) {
				throw new BadRequestError('Validation Errors: '+errors);
			}
			return true;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Unable to validate request: ' + error);
		}
	}

    public cleanBodyParams() {
		return Utility.removeUndefinedNullFromObj(this)
	}

    sanitize() {
		delete this.id;
		return this;
	}

	insertSanitize() {
		delete this.id;
		delete this.createdAt;
		this.cleanBodyParams();
		return this;
	}

    updateSanitize(){
        this.cleanBodyParams();
        return this
    }
}
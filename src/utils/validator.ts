import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

export class Validator{
    static phoneValidator:RegExp=/^\d{10}$/;
    static emailValidator:RegExp=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    static nameValidator:RegExp=/^[A-z ']+$/;

    static positiveNumber = /^\b[0-9]*\.?[0-9]+$/;
    static positiveNumberorBlank = /^-?\b[0-9]*\.?[0-9]+$|^$/;
    static numberOrBlank = /^-?\b[0-9]*\.?[0-9]+$|^$/;
    static lessThan100 = /^0*(?:[1-9][0-9]?|100)$/;
    static alphabatic = /^[\w\s]+$/;
    static phone = /[56789][0-9]{9}/;
    static email = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}|^$/;
    static upi = /[a-z0-9._%+-]+@[a-zA-Z0-9.]|^$/;
    static accountNumber = /[0-9]{9,18}|^$/;
    static ifsc = /[A-Za-z]{4}[a-zA-Z0-9]{7}$|^$/;
    static pan = /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}|^$/;
    static tan = /[a-zA-Z]{4}[0-9]{5}[a-zA-Z]{1}|^$/;
    static gstin = /\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}|^$/;
    static gstin2 = /\d{2}[A-Za-z]{4}\d{5}[A-Za-z]{1}[\d]{1}[A-Za-z]{2}/;
}

@ValidatorConstraint({ name: 'maxDigits', async: false })
export class MaxDigits implements ValidatorConstraintInterface {
  validate(num: number, args: ValidationArguments) {
    if(num !== undefined && num !== null) {
      return num.toString().length <= args.constraints[0]; // for async validations you must return a Promise<boolean> here
    } else {
    return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.targetName} ${args.property} can have a maximum of ${args.constraints[0]} digits`;
  }
}

@ValidatorConstraint({ name: 'maxPositiveDigits', async: false })
export class MaxPositiveDigits implements ValidatorConstraintInterface {
  validate(num: number, args: ValidationArguments) {
    if(num !== undefined && num !== null && num >= 0) {
      return num.toString().length <= args.constraints[0]; // for async validations you must return a Promise<boolean> here
    } else {
    return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.targetName} ${args.property} should be positive ${args.constraints[0]} digits`;
  }
}

@ValidatorConstraint({ name: 'maxPositivePercentageDigits', async: false })
export class MaxPositivePercentageDigits implements ValidatorConstraintInterface {
  validate(num: number, args: ValidationArguments) {
    if(num !== undefined && num !== null && num >= 0 && num <= 100) {
      return num.toString().length <= args.constraints[0]; // for async validations you must return a Promise<boolean> here
    } else {
    return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.targetName} ${args.property} should be positive ${args.constraints[0]} digits`;
  }
}

@ValidatorConstraint({ name: 'zeroOrOne', async: false })
export class IsZeroOrOne implements ValidatorConstraintInterface {
  validate(num: number, args: ValidationArguments) {
    return num == 0 || num == 1; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.targetName} ${args.property} can be either zero or one`;
  }
}

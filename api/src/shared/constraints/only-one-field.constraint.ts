import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({ name: 'OnlyOneField', async: false })
export class OnlyOneFieldConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		const fieldsToCheck = args.constraints[0] as string[];
		const targetObject = args.object as Record<string, any>;

		const filledFields = fieldsToCheck.filter((field) => targetObject[field]);

		console.log(filledFields);
		return filledFields.length <= 1;
	}

	defaultMessage(args: ValidationArguments) {
		const fieldsToCheck = args.constraints[0] as string[];
		return `Only one of the following fields can be specified: ${fieldsToCheck.join(', ')}`;
	}
}
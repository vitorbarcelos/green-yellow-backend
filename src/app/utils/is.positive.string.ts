import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

export function isPositiveString(value: unknown): boolean {
  const isValidType = typeof value === 'number' || typeof value === 'string';
  return isValidType && !isNaN(Number(value)) && Number(value) > 0;
}

export function IsPositiveString(validationOptions?: ValidationOptions): PropertyDecorator {
  const message = (eachPrefix: string) => eachPrefix + '$property must be a positive number';
  return ValidateBy(
    {
      name: 'IsPositiveString',
      validator: {
        validate: (value, args): boolean => isPositiveString(value),
        defaultMessage: buildMessage(message, validationOptions),
      },
    },
    validationOptions,
  );
}

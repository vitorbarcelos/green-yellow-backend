import { buildMessage, ValidateBy } from 'class-validator';
import { isFile, StoredFile } from 'nestjs-form-data';

export function IsFile(required: boolean = true, maxSizeBytes: number, allowedMimeTypes: string[]): PropertyDecorator {
  const constraints: any[] = [];
  let defaultSuffix = '';

  return ValidateBy({
    name: 'IsFile',
    constraints,
    validator: {
      defaultMessage: buildMessage((eachPrefix) => eachPrefix + defaultSuffix),
      validate: (value: StoredFile) => {
        if (required && !value) {
          defaultSuffix = '$property should not be empty';
          return false;
        }

        if (!!value && !isFile(value)) {
          defaultSuffix = '$property must be a valid file';
          return false;
        }

        if (isFile(value)) {
          if (value.size > maxSizeBytes) {
            defaultSuffix = '$property size should not exceed $constraint1 bytes';
            constraints.push(maxSizeBytes);
            return false;
          }
        }

        if (!allowedMimeTypes.includes(value.mimeType)) {
          defaultSuffix = '$property must be one of the allowed types: $constraint1';
          constraints.push(allowedMimeTypes.join(', '));
          return false;
        }

        return true;
      },
    },
  });
}

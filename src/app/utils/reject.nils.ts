import { isNil } from '@/app/utils/is.nil';

export function rejectNils<T extends Object>(value: T): T {
  return Object.entries(value)
    .filter(([_, value]) => !isNil(value))
    .reduce((accumulator, [key, value]) => {
      return {
        ...accumulator,
        [key]: value,
      };
    }, {}) as T;
}

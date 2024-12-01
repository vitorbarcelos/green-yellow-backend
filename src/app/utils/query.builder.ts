import keyFormat from '@/app/utils/key.format';
import { isNil } from '@/app/utils/is.nil';

export const QueryBuilder = {
  buildConditionals(query: string, conditionals: [string, Record<string, any>][]): string {
    let clauses = '';

    for (const [conditional, values] of conditionals) {
      if (isNil(clauses)) {
        const filter = `WHERE ${conditional}`;
        clauses += keyFormat(filter, values);
      } else {
        const filter = ` AND ${conditional}`;
        clauses += keyFormat(filter, values);
      }
    }

    return clauses ? `${query} ${clauses}` : query;
  },
};

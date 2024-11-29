import { UserOutput } from '@user/application/contracts/user.output.interface';

export {};

declare global {
  type Optional<T> = T | undefined;

  export type AsyncPagination<T> = Promise<Pagination<T>>;
  export type Pagination<T> = {
    maxResults: number;
    numResults: number;
    pageNumber: number;
    totalPages: number;
    items: T[];
  };

  namespace Express {
    export interface Application {}
    export interface Response {}
    export interface Locals {}
    export interface Request {
      user: Optional<UserOutput>;
    }
  }
}

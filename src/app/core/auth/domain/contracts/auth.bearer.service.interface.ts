import { UserOutput } from '@user/application/contracts/user.output.interface';
import { AuthVerify } from '@auth/domain/contracts/auth.typings';

export interface AuthBearerServiceInterface {
  verify<R = AuthVerify>(bearer: string, callback: (user: UserOutput) => R): Promise<R>;
}

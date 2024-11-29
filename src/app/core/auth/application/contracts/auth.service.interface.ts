import { AuthorizeInterface, RegisterInterface } from '@auth/application/contracts/auth.input.interface';
import { TokenOutputInterface } from '@auth/application/contracts/auth.output.interface';

export interface AuthServiceInterface {
  rootRegister(body: RegisterInterface): Promise<TokenOutputInterface>;
  authorize(body: AuthorizeInterface): Promise<TokenOutputInterface>;
  register(body: RegisterInterface): Promise<TokenOutputInterface>;
}

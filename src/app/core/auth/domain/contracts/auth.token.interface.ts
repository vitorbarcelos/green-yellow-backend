export interface TokenPayloadInterface {
  sub: number;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

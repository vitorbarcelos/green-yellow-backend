export interface RegisterInterface {
  displayName: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
}

export interface AuthorizeInterface {
  password: string;
  email: string;
}

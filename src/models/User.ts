export interface User {
  id: string,
  email: string,
  fullname: string,
  cash?: number;
  phone?: number,
  active?: boolean,
  timeDifer?: number; // value in minutes
}

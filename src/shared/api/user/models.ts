import { AnyType } from 'helpers';

export interface FirebaseUser {
  [x: string]: AnyType;
  uid: string,
  firstName: string,
  lastName: string,
  email: string,
  referrer: string,
  referralsCount: 0,
  provider?: string,
  picture?: string;
  name?: string;
}

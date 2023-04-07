export interface UserReducer {
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

export interface UserState {
  user: UserReducer;
}

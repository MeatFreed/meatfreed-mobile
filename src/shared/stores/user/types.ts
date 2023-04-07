import { FirebaseUser } from 'api';

export interface UserReducer extends FirebaseUser {}

export interface UserState {
  user: UserReducer;
}

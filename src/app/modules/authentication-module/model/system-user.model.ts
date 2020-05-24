import {Address} from './address.model';

export class SystemUser {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  address?: Address;

  constructor(props = {}) {
    Object.assign(this, props);
  }

}

export enum RegistrationStep {
  ACCOUNT = 'ACCOUNT',
  ADDRESS = 'ADDRESS',
  ACTIVATION = 'ACTIVATION'
}


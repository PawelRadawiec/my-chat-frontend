export class SystemUser {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  country?: string;
  city?: string;
}

export enum RegistrationStep {
  ACCOUNT = 'ACCOUNT',
  ADDRESS = 'ADDRESS',
  ACTIVATION = 'ACTIVATION'
}


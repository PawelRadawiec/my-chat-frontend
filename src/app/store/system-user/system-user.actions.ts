import { SystemUser } from 'src/app/components/nav/nav.component';

export class SystemUserGetList {
  static readonly type = '[SystemUser] GetList';

  constructor() { }
}

export class SystemUserRegistration {
  static readonly type = '[SystemUser] Registration';
  constructor(public request: SystemUser) { }
}

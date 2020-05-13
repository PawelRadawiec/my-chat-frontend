import {SystemUser} from '../../modules/authentication-module/model/system-user.model';


export class SystemUserGetList {
  static readonly type = '[SystemUser] GetList';

  constructor() {
  }
}

export class SystemUserRegistration {
  static readonly type = '[SystemUser] Registration';

  constructor(public request: SystemUser) {
  }
}

export class SystemUserSearch {
  static readonly type = '[SystemUser] Search';

  constructor(public username: string) {

  }
}

export class SystemUserRegistrationFailed {
  static readonly type = '[SystemUser] RegistrationFailed';

  constructor(public errorMap: { [key: string]: string; }) {

  }
}

export class RegistrationAccountStep {
  static readonly type = '[SystemUser] RegistrationAccountStep';

  constructor(public systemUser: SystemUser) {

  }
}

export class RegistrationAddressStep {
  static readonly type = '[SystemUser] RegistrationAddressStep';

  constructor(public systemUser: SystemUser) {

  }
}

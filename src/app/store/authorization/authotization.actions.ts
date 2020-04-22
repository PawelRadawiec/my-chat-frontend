import {SystemUser} from '../../model/system-user.model';

export class GetAuthorization {
  static readonly type = '[Authorization] Get';

  constructor(public login: string, public password: string) {
  }

}

export class SetSystemUser {
  static readonly type = '[Authorization] Set';

  constructor(public user: SystemUser) {

  }
}

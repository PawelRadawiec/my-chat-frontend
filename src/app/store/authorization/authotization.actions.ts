
export class GetAuthorization {
  static readonly type = '[Authorization] Get';

  constructor(public login: string, public password: string) {
  }

}

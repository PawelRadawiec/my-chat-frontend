export class SetErrorMap {
  static type = '[Error] SetErrorMap';

  constructor(public errorMap: { [key: string]: string }) {

  }
}

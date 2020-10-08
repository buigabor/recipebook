export class User {
  constructor(
    public email: string,
    public id: string,
    // tslint:disable-next-line: variable-name
    public _token: string,
    // tslint:disable-next-line: variable-name
    public _tokenExpirationDate: Date
  ) {}

  get token(): string | null {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  // get tokenExpirationDate(): Date | null {
  //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
  //     return null;
  //   }
  //   return this._tokenExpirationDate;
  // }
}

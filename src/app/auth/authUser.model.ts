export class AuthUser {
  constructor(
    public email: string,
    public id: string,
    private _token: string, // received when a user logs in each time
    private _tokenExpirationDate: Date //private because can only access in here through a getter see below
  ) {}

  get token() {
    // if the token is expired or is less than the current date/timestamp (therefore in the past and expired)
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null; //even though we may have a token - an expired token
    }
    return this._token;
  }
}

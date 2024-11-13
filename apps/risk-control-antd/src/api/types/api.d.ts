declare namespace RgApi {
  namespace Base {}
  namespace Auth {
    interface IAuthLoginReq {
      code: string;
      password: string;
      username: string;
      uuid: string;
    }
  }
}

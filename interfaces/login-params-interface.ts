export interface TypeLoginForm {
  usr: string;
  pwd: string;
}
export interface TypeLoginAPIParams {
  values: TypeLoginForm;
  isGuest: boolean;
  loginViaOTP: boolean;
  LoginViaGoogle: boolean;
}

export interface TypeRegistrationForm {
  eml: string;
  usr: string;
  pwd: string;
}
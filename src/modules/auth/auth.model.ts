import { ForgotPasswordSchemaType, LoginSchemaType, RegisterSchemaType } from './components';

class AuthLogin implements LoginSchemaType {
  phone_number_or_identify: string = '';
  password: string = '';
}

class AuthRegister implements RegisterSchemaType {
  email: string = '';
  password: string = '';
  full_name: string = '';
  phone_number: string = '';
  date_of_issuance: Date | null = null;
  address: string = '';
  password_confirm: string = '';
  date_of_birth: Date | null = null;
  phone_number_familiar?: string = '';
  idenfity?: string = '';
  address_current?: string = '';
  url_facebook?: string = '';
}

class AuthForgotPassword implements ForgotPasswordSchemaType {
  email: string = '';
}

export { AuthLogin, AuthRegister, AuthForgotPassword };

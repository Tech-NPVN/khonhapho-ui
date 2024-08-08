import { ForgotPasswordSchemaType, LoginSchemaType, RegisterSchemaType } from './components';

class AuthLogin implements LoginSchemaType {
  username: string = '';
  password: string = '';
}

class AuthRegister implements RegisterSchemaType {
  email: string = '';
  password: string = '';
  full_name: string = '';
  phone_number: string = '';
  password_confirm: string = '';
}

class AuthForgotPassword implements ForgotPasswordSchemaType {
  email: string = '';
}

export { AuthLogin, AuthRegister, AuthForgotPassword };

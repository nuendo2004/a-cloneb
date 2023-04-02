abstract class LoginModel {
  email: string;
  password: string;

  constructor(email: string = "", password: string = "") {
    this.email = email;
    this.password = password;
  }
}

abstract class RegisterModel extends LoginModel {
  name: string;
  constructor(name: string = "", email: string = "", password: string = "") {
    super(email, password);
    this.name = name;
  }
}

export { RegisterModel, LoginModel };

// src/domain/user.ts
export class User {
  constructor(
    private id: string,
    private name: string,
    private phone: string,
    private email: string,
    private password: string
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }
  getPhone() {
    return this.phone;
  }

  getPassword() {
    return this.password;
  }



    checkPassword(password: string): boolean {
        return this.password === password; // later replace with bcrypt
    }
}

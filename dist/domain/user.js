"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/domain/user.ts
class User {
    constructor(id, name, phone, email, password) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
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
    checkPassword(password) {
        return this.password === password; // later replace with bcrypt
    }
}
exports.User = User;

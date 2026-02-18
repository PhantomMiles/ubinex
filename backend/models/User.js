import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

const users = new Map();

export class User {
  constructor(email, password, firstName, lastName, country, role = 'customer') {
    this.id = uuid();
    this.email = email;
    this.passwordHash = bcrypt.hashSync(password, 10);
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.role = role; // 'customer' or 'admin'
    this.createdAt = new Date();
    this.profileImage = null;
  }

  verifyPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  toJSON() {
    const { passwordHash, ...rest } = this;
    return rest;
  }
}

export function saveUser(user) {
  users.set(user.email, user);
  return user;
}

export function getUserByEmail(email) {
  return users.get(email);
}

export function getUserById(id) {
  for (const user of users.values()) {
    if (user.id === id) return user;
  }
  return null;
}

export function getAllUsers() {
  return Array.from(users.values());
}

export function updateUser(email, updates) {
  const user = users.get(email);
  if (user) {
    Object.assign(user, updates);
  }
  return user;
}

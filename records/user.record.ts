import { nanoid } from 'nanoid';
import { ValidationError } from '../utils/handleError';
import { pool } from '../utils/db';
import { UserEntity, UserResult, UserCreate } from '../types';

export class UserRecord implements UserEntity {
  id: string;

  name: string;

  email: string;

  password: string;

  age: number;

  private readonly saved: boolean;

  constructor(userData: UserCreate) {
    this.saved = !!userData.id;
    this.id = userData.id ?? nanoid();
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.age = userData.age;

    this.validate();
  }

  private validate() {
    const RegEx = /[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?/;

    const emailIsIncorrect = !RegEx.test(this.email);

    if (!this.email) {
      throw new ValidationError('Email is required', 404);
    }

    if (this.email.trim().length > 4 || this.email.trim().length > 300) {
      throw new ValidationError('Email length cant be less than 4 and greater than 300', 404);
    }

    if (emailIsIncorrect) {
      throw new ValidationError('Your email is incorrect', 404);
    }

    if (!this.name) {
      throw new ValidationError('Name must exist', 404);
    }
    if (this.name.trim().length <= 3 || this.name.trim().length > 40) {
      throw new ValidationError('Name must be at least 3 characters long and not more than 40', 404);
    }

    if (!this.age || this.age < 1 || this.age > 140) {
      throw new ValidationError('Age must be between 1 and 140', 404);
    }
    if (!this.password || this.password.trim().length === 0) {
      throw new ValidationError('Password cant be empty', 404);
    }
  }

  static async createTable() {
    await pool.execute('CREATE TABLE IF NOT EXISTS `users`(`id` VARCHAR(21)  PRIMARY KEY NOT NULL, `name` VARCHAR(40) NOT NULL, `email` VARCHAR(300) UNIQUE NOT NULL, `password` VARCHAR(60) NOT NULL, `age` TINYINT(3) UNSIGNED NOT NULL)');
  }

  static async getOneById(id: string) {
    const [result] = await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
      id,
    }) as UserResult;
    return result.length !== 0 ? new UserRecord(result[0]) : null;
  }

  static async getOneByEmail(email: string) {
    const [result] = await pool.execute('SELECT * FROM `users` WHERE `email` = :email', {
      email,
    }) as UserResult;
    return result.length !== 0 ? new UserRecord(result[0]) : null;
  }

  static async getAll() {
    const [result] = await pool.execute('SELECT * FROM `users` WHERE 1') as UserResult;

    return result.map((user) => new UserRecord(user));
  }

  async save() {
    if (this.saved) throw new ValidationError('Cant create users again!', 404);

    await pool.execute('INSERT INTO `users` (`id`, `name`, `email`, `password`, `age` )VALUES(:id, :name, :email, :password, :age)', {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      age: this.age,
    });

    return this.id;
  }

  async update() {
    this.validate();
    await pool.execute('UPDATE `users` SET  `name`=:name, `email`=:email, `password`=:password, `age`=:age WHERE `id`=:id', {
      name: this.name,
      email: this.email,
      password: this.password,
      age: this.age,
      id: this.id,
    });
    return this.id;
  }

  async remove() {
    await pool.execute('DELETE FROM `users` WHERE `id`=:id', {
      id: this.id,
    });
  }
}

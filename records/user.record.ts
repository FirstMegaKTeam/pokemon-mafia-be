import { nanoid } from 'nanoid';
import { ValidationError } from '../utils/handleError';
import { pool } from '../utils/db';
import { UserEntity, UserResult, UserCreate } from '../types';
import { FavoriteResult } from '../types/favorite-pokemon/favorite-result';
import { FavoritePokemonRecord } from './favorite-pokemon.record';

export class UserRecord implements UserEntity {
  #id!: string;

  #name!: string;

  #email!: string;

  #password!: string;

  #age!: number;

  get id() {
    return this.#id;
  }

  private set id(id: string) {
    this.#id = id;
  }

  get name() {
    return this.#name;
  }

  set name(name: string) {
    if (!name) {
      throw new ValidationError('Name must exist', 404);
    }
    if (name.trim().length <= 3 || name.trim().length > 40) {
      throw new ValidationError('Name must be at least 3 characters long and not more than 40', 404);
    }

    this.#name = name;
  }

  get email() {
    return this.#email;
  }

  set email(email: string) {
    const RegEx = /[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?/;

    if (!email) {
      throw new ValidationError('Email is required', 404);
    }

    const emailIsIncorrect = !RegEx.test(email);

    if (email.trim().length < 4 || email.trim().length > 300) {
      throw new ValidationError('Email length cant be less than 4 and greater than 300', 404);
    }

    if (emailIsIncorrect) {
      throw new ValidationError('Your email is incorrect', 404);
    }

    this.#email = email;
  }

  get age() {
    return this.#age;
  }

  set age(age:number) {
    if (!age || age < 1 || age > 140) {
      throw new ValidationError('Age must be between 1 and 140', 404);
    }

    this.#age = age;
  }

  get password() {
    return this.#password;
  }

  set password(password: string) {
    if (!password || password.trim().length === 0) {
      throw new ValidationError('Password cant be empty', 404);
    }

    this.#password = password;
  }

  get property() {
    return {
      id: this.id,
      name: this.name,
      password: this.password,
      email: this.email,
      age: this.age,
    };
  }

  constructor(userData: UserCreate) {
    this.id = userData.id ?? nanoid();
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.age = userData.age;
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
    const RegEx = /[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?/;

    const emailIsIncorrect = !RegEx.test(this.email);

    if (!this.email) {
      throw new ValidationError('Email is required', 404);
    }

    if (this.email.trim().length < 4 || this.email.trim().length > 300) {
      throw new ValidationError('Email length cant be less than 4 and greater than 300', 404);
    }

    if (emailIsIncorrect) {
      throw new ValidationError('Your email is incorrect', 404);
    }

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

  async getUserFavoritePokemon() {
    const [result] = await pool.execute('SELECT  `favorite_pokemon`.`id`, `favorite_pokemon`.`pokemonId`, `favorite_pokemon`.`userId` FROM `users` INNER JOIN  `favorite_pokemon` ON `users`.`id` = `favorite_pokemon`.`userId` WHERE `users`.`id`= :id', {
      id: this.id,
    }) as FavoriteResult;
    return result.map((fav) => new FavoritePokemonRecord(fav));
  }
}

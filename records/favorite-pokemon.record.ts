import { nanoid } from 'nanoid';
import { ValidationError } from '../utils/handleError';
import { pool } from '../utils/db';
import { FavoriteEntity, CreateFavorite } from '../types';
import { FavoriteResult } from '../types/favorite-pokemon/favorite-result';

export class FavoritePokemonRecord implements FavoriteEntity {
    #id!: string;

    #userId!: string;

    #pokemonId!: string;

    get pokemonId() {
        return this.#pokemonId;
    }

    set pokemonId(value: string) {
        if (!value || value.trim().length === 0) {
            throw new ValidationError('The pokemon you want to add to your favorites has been incorrectly selected', 404);
        }

        this.#pokemonId = value;
    }

    get userId() {
        return this.#userId;
    }

    set userId(value: string) {
        if (!value || value.trim().length === 0) {
            throw new ValidationError('We cannot find your ID. Remember that you must be logged in', 404);
        }
        this.#userId = value;
    }

    get id() {
        return this.#id;
    }

    private set id(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error('Id FavoritePokemonRecord is required');
        }

        this.#id = value;
    }

    get property() {
        return {
            id: this.id,
            userId: this.userId,
            pokemonId: this.pokemonId,
        };
    }

    constructor(favoritePokemon: CreateFavorite) {
        this.id = favoritePokemon.id ?? nanoid();
        this.pokemonId = favoritePokemon.pokemonId;
        this.userId = favoritePokemon.userId;
    }

    static async createFavoritePokemonTable() {
        await pool.execute('CREATE TABLE IF NOT EXISTS `favorite_pokemon`(`id` VARCHAR(21)  PRIMARY KEY NOT NULL, `userId` VARCHAR(21) , `pokemonId` VARCHAR(21)  NOT NULL,  FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)');
    }

    async save() {
        await pool.execute('INSERT INTO `favorite_pokemon` (`id`, `userId`, `pokemonId`) VALUES (:id,  :userId, :pokemonId)', {
            id: this.id,
            pokemonId: this.pokemonId,
            userId: this.userId,
        });
    }

    async remove() {
        await pool.execute('DELETE FROM `favorite_pokemon` WHERE `id`=:id', {
            id: this.id,
        });
    }

    static async getAll() {
        const [result] = await pool.execute('SELECT * FROM `favorite_pokemon` WHERE 1') as FavoriteResult;

        return result.map((fav) => new FavoritePokemonRecord(fav));
    }
}

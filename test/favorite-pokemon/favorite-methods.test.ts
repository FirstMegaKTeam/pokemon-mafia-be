import { FavoritePokemonRecord } from '../../records/favorite-pokemon.record';
import { pool } from '../../utils/db';
import { userId1, userId2 } from '../testUtils/usersId';

const id = '34d27f76-c0ec-4ba7';

let fav1: FavoritePokemonRecord;
let fav2: FavoritePokemonRecord;
let fav3: FavoritePokemonRecord;
let fav4: FavoritePokemonRecord;

beforeAll(async () => {
    await FavoritePokemonRecord.createFavoritePokemonTable();

    await pool.execute('DELETE FROM `favorite_pokemon` WHERE  1');
    fav1 = new FavoritePokemonRecord({
        id,
        userId: userId1,
        pokemonId: 'pokemon1id',
    });

    fav2 = new FavoritePokemonRecord({
        userId: userId2,
        pokemonId: 'pokemon1id',
    });

    fav3 = new FavoritePokemonRecord({
        userId: userId2,
        pokemonId: 'pokemon3id',
    });

    fav4 = new FavoritePokemonRecord({
        userId: userId1,
        pokemonId: 'pokemon4id',
    });

    await fav1.save();
    await fav2.save();
    await fav3.save();
    await fav4.save();
});

afterAll(async () => {
    await pool.end();
});

test('FavoritePokemonRecord should correct save', async () => {
    const favAr = await FavoritePokemonRecord.getAll();

    expect(favAr).toBeDefined();
    expect(favAr.length).toBe(4);
});

test('Remove should  remove record from db', async () => {
    await fav1.remove();
    const favAr = await FavoritePokemonRecord.getAll();

    const emptyArr = favAr.filter((el) => el.id === id);

    expect(favAr.length).toBe(3);
    expect(emptyArr.length).toBe(0);
});

import { nanoid } from 'nanoid';
import { FavoritePokemonRecord } from '../../records/favorite-pokemon.record';
import { CreateFavorite } from '../../types';

test('FavoritePokemonRecord should be correct created with id', () => {
  const favoritePokemon = new FavoritePokemonRecord({
    id: nanoid(),
    pokemonId: nanoid(),
    userId: nanoid(),
  });

  expect(favoritePokemon).toBeDefined();
});

test('FavoritePokemonRecord should be correct created without  id', () => {
  const favoritePokemon = new FavoritePokemonRecord({
    pokemonId: nanoid(),
    userId: nanoid(),
  });

  expect(favoritePokemon).toBeDefined();
});

test('Create FavoritePokemonRecord without pokemonId should throw', () => {
  expect(() => {
    new FavoritePokemonRecord({
      userId: nanoid(),
    } as CreateFavorite);
  }).toThrow(/The pokemon you want to add to your favorites has been incorrectly selected/);
});

test('FavoritePokemonRecord  with pokemonId as empty string should throw', () => {
  expect(() => {
    new FavoritePokemonRecord({
      userId: nanoid(),
      pokemonId: '',
    } as CreateFavorite);
  }).toThrow(/The pokemon you want to add to your favorites has been incorrectly selected/);
});

test('FavoritePokemonRecord  without  should throw', () => {
  expect(() => {
    new FavoritePokemonRecord({
      pokemonId: nanoid(),
    } as CreateFavorite);
  }).toThrow(/We cannot find your ID. Remember that you must be logged in/);
});

test('FavoritePokemonRecord  witch pokemonId as empty string should throw', () => {
  expect(() => {
    new FavoritePokemonRecord({
      pokemonId: nanoid(),
      userId: '',
    } as CreateFavorite);
  }).toThrow(/We cannot find your ID. Remember that you must be logged in/);
});

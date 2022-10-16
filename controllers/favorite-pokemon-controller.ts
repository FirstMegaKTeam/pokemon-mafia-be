import { RequestHandler } from 'express';
import { FavoritePokemonRecord } from '../records/favorite-pokemon.record';
import { UserRecord } from '../records/user.record';
import { ValidationError } from '../utils/handleError';

export const getFavorite: RequestHandler = async (req, res, _next) => {
  const user = req.user as UserRecord;
  if (!user) throw new ValidationError('You must log in', 401);

  const favPokemon = await FavoritePokemonRecord.getAll(user.id);

  res.json(favPokemon);
};

export const addToFavorite: RequestHandler = async (req, res, _next) => {
  const user = req.user as UserRecord;
  const { pokemonId }: {pokemonId: string} = req.body;
  if (!user || !pokemonId) throw new ValidationError('You must be loggin and send pokemon id', 404);

  const newFavPokemon = new FavoritePokemonRecord({ userId: user.id, pokemonId });

  await newFavPokemon.save();

  res.json({ isSuccess: true });
};

export const deleteFromFavorite: RequestHandler = async (req, res, _nest) => {
  const { favId } = req.params;

  if (!favId) throw new ValidationError('You must be logg in and send favorite id', 404);

  await FavoritePokemonRecord.remove(favId);

  res.json({ isSuccess: true });
};

import { Router } from 'express';
import { addToFavorite, deleteFromFavorite, getFavorite } from '../controllers/favorite-pokemon-controller';

export const favoritePokemonRouter = Router();

favoritePokemonRouter
  .get('/', getFavorite)
  .post('/', addToFavorite)
  .delete('/:favId', deleteFromFavorite);

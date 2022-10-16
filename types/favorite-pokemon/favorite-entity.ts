import { CreateFavorite } from './create-favorite';

export interface FavoriteEntity extends Omit<CreateFavorite, 'id'> {
    id: string
}

import { FieldPacket } from 'mysql2';
import { FavoriteEntity } from './favorite-entity';

export type FavoriteResult = [FavoriteEntity[], FieldPacket[]]

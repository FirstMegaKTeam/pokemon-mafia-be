import { FieldPacket } from 'mysql2';
import { UserEntity } from './user-entity';

export type UserResult = [UserEntity[], FieldPacket[]]

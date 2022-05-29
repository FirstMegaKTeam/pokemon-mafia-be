import { UserRecord } from '../../records/user.record';
import { UserCreate } from '../../types';

test('User should throw when password dont exist', () => {
  expect(() => {
    new UserRecord({
      age: 20,
      email: 'example@example.com',
      name: 'Example',
    } as UserCreate);
  }).toThrow(/Password cant be empty/);
});

test('User should throw when password is only white space', () => {
  expect(() => {
    new UserRecord({
      age: 20,
      email: 'example@example.com',
      password: '   ',
      name: 'Example',
    } as UserCreate);
  }).toThrow(/Password cant be empty/);
});

test('User should throw when password is empty string', () => {
  expect(() => {
    new UserRecord({
      age: 20,
      email: 'example@example.com',
      password: '',
      name: 'Example',
    } as UserCreate);
  }).toThrow(/Password cant be empty/);
});

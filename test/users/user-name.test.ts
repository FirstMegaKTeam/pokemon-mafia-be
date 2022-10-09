import { UserRecord } from '../../records/user.record';
import { UserCreate } from '../../types';
import { randomText } from '../testUtils/random-text';

test('User should throw when name ist undefined', () => {
  expect(() => {
    new UserRecord({
      age: 20,
      email: 'example@example.com',
      password: 'example',
    } as UserCreate);
  }).toThrow(/Name must exist/);
});

test('User should throw when name.length is  less then equal to 3', () => {
  expect(() => {
    new UserRecord({
      age: 20,
      email: 'example@example.com',
      name: randomText(3),
      password: 'example',
    });
  }).toThrow(/Name must be at least 3 characters long and not more than 40/);
});

test('User should throw when name is only white char', () => {
  expect(() => {
    new UserRecord({
      age: 20,
      email: 'example@example.com',
      name: '     ',
      password: 'example',
    });
  }).toThrow(/Name must be at least 3 characters long and not more than 40/);
});

test('User should throw when name.length is greater than 40', () => {
  expect(() => {
    new UserRecord({
      age: 20,
      email: 'example@example.com',
      name: randomText(41),
      password: 'example',
    });
  }).toThrow(/Name must be at least 3 characters long and not more than 40/);
});

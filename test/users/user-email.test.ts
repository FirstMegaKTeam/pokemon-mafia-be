import { UserRecord } from '../../records/user.record';
import { randomText } from '../testUtils/random-text';
import { UserCreate } from '../../types';

test('User should throw when email is undefined', () => {
  expect(() => {
    new UserRecord({
      age: 20,
      password: 'example',
      name: 'Example',
    } as UserCreate);
  }).toThrow(/Email is required/);
});

test('User should throw when email is only white char', () => {
  expect(() => {
    new UserRecord({
      age: 20,
      email: '   ',
      password: 'example',
      name: 'Example',
    });
  }).toThrow(/Email length cant be less than 4 and greater than 300/);
});

test('User should trow when email.length is greater than 300', () => {
  const longEmail = `${randomText(301)}@example.com`;

  expect(() => {
    // eslint-disable-next-line no-new
    new UserRecord({
      age: 20,
      email: longEmail,
      name: 'Example',
      password: 'example',
    });
  }).toThrow(/Email length cant be less than 4 and greater than 300/);
});

test('user should throw when email dont have @', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new UserRecord({
      age: 20,
      email: 'example.com',
      name: 'Example',
      password: 'example',
    });
  }).toThrow(/Your email is incorrect/);
});

test('User should throw when @ is first char', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new UserRecord({
      age: 20,
      email: '@example.com',
      name: 'Example',
      password: 'example',
    });
  }).toThrow(/Your email is incorrect/);
});

test('User should throw when email dont have "."', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new UserRecord({
      age: 20,
      email: 'example@example',
      name: 'Example',
      password: 'example',
    });
  }).toThrow(/Your email is incorrect/);
});

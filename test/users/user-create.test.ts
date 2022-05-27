import { UserRecord } from '../../records/user.record';

test('User should be correct created witch id', () => {
  const user = new UserRecord({
    id: 'example',
    age: 20,
    email: 'example@example.com',
    name: 'Example',
    password: 'example',
  });

  expect(user).toBeDefined();
  expect(user).toBeInstanceOf(UserRecord);
  expect(user.id).toBe('example');
  expect(user.name).toBe('Example');
  expect(user.password).toBe('example');
  expect(user.email).toBe('example@example.com');
  expect(user.age).toBe(20);
});

test('User should be correct create without id', () => {
  const user = new UserRecord({
    age: 20,
    email: 'example@example.com',
    name: 'Example',
    password: 'example',
  });

  expect(user).toBeDefined();
  expect(user).toBeInstanceOf(UserRecord);
  expect(user.id).toBeDefined();
  expect(user.name).toBe('Example');
  expect(user.password).toBe('example');
  expect(user.email).toBe('example@example.com');
  expect(user.age).toBe(20);
});

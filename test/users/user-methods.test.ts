import { pool } from '../../utils/db';
import { UserRecord } from '../../records/user.record';

const id = '34d27f76-c0ec-4ba7';

let user: UserRecord;
let user2: UserRecord;
let user3: UserRecord;
let nextUser: UserRecord;

beforeAll(async () => {
  await pool.execute('DELETE FROM  `users`');

  user = new UserRecord({
    id,
    email: 'example@example.com',
    password: 'password',
    age: 12,
    name: 'Example1',
  });

  user2 = new UserRecord({
    id: 'b2f58a90-fc3d-4e9a-9',
    email: 'john@doe.com',
    password: 'password',
    age: 12,
    name: 'Example2',
  });

  user3 = new UserRecord({
    id: 'c5c278c1-bf58-',
    email: 'mdsdr@smith.com',
    password: 'password',
    age: 12,
    name: 'Example3',
  });

  await user.save();
  await user2.save();
  await user3.save();
});

afterAll(async () => {
  await pool.end();
});

test('UserRecord findOne in db should be defined', async () => {
  const findUser = await UserRecord.getOneById(id);
  expect(findUser).toBeDefined();
  expect(findUser).toBeInstanceOf(UserRecord);
});

test('UserRecord findOne in db not existing record should be null', async () => {
  const notExisted = await UserRecord.getOneById('000');
  expect(notExisted).toBeNull();
});

test('Save UserRecord should  return id', async () => {
  nextUser = new UserRecord({
    id: 'b2f58a90-fc3d-4e9a',
    email: 'manu@doe.com',
    password: 'password',
    age: 12,
    name: 'ExampleNext',
  });

  const idBeforeSave = await nextUser.save();
  const nextUserFromDB = await UserRecord.getOneById(idBeforeSave!);
  expect(nextUserFromDB).toBeInstanceOf(UserRecord);
});

test('UserRecord findAll() should return array with 3 records and first record is user', async () => {
  const findAll = await UserRecord.getAll();

  expect(findAll.length).toBe(4);
});
//
test('User record update should return updated record and save in db', async () => {
  const age = 24;
  const password = 'newPassword';
  const email = 'newEmail@exaple.com';

  user.age = age;
  user.password = password;
  user.email = email;

  await user.update();

  const updateUser = await UserRecord.getOneById(user.id!);

  expect(updateUser!.age).toBe(age);
  expect(updateUser!.password).toBe(password);
  expect(updateUser!.email).toBe(email);
});

test('UserRecord.update() should throw when email is incorrect', () => {
  expect(() => {
    user.email = '';
  }).toThrow(/Email is required/);
});

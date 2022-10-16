import { pool } from '../../utils/db';
import { UserRecord } from '../../records/user.record';
import { userId1, userId2 } from '../testUtils/usersId';

const id = '34d27f76-c0ec-4ba7';

let user: UserRecord;
let user2: UserRecord;
let user3: UserRecord;
let nextUser: UserRecord;
let nextUserId: string;

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
        id: userId1,
        email: 'john@doe.com',
        password: 'password',
        age: 12,
        name: 'Example2',
    });

    user3 = new UserRecord({
        id: userId2,
        email: 'mdsdr@smith.com',
        password: 'password',
        age: 12,
        name: 'Example3',
    });

    nextUser = new UserRecord({
        id: 'fgdgfd-fc3d-455e9ya',
        email: 'manu@doe.com',
        password: 'password',
        age: 12,
        name: 'ExampleNext',
    });

    await user.save();
    await user2.save();
    await user3.save();
    nextUserId = await nextUser.save();
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
    const nextUserFromDB = await UserRecord.getOneById(nextUserId);
    expect(nextUserFromDB).toBeInstanceOf(UserRecord);
});

test('UserRecord findAll() should return array with 4 records and first record is user', async () => {
    const findAll = await UserRecord.getAll();

    expect(findAll.length).toBe(4);
});

test('UserRecord findAll()  should return instanceof UserRecord', async () => {
    const findAll = await UserRecord.getAll();

    findAll.forEach((userEl) => {
        expect(userEl).toBeInstanceOf(UserRecord);
    });
});
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

test('Remove should remove user from db', async () => {
    await user.remove();
    const users = await UserRecord.getAll();
    expect(users.length).toBe(3);
});

test('UserRecord.getByEmail should return user', async () => {
    const userByEmail = await UserRecord.getOneByEmail('john@doe.com');

    expect(userByEmail).toBeDefined();
    expect(userByEmail).toBeInstanceOf(UserRecord);
});

import { UserRecord } from '../../records/user.record';
import { UserCreate } from '../../types';

test('User should throw when age is undefined', () => {
    expect(() => {
        new UserRecord({
            name: 'Example',
            email: 'example@example.com',
            password: 'example',
        } as UserCreate);
    }).toThrow(/Age must be between 1 and 140/);
});

test('User should throw when age is undefined', () => {
    expect(() => {
        new UserRecord({
            name: 'Example',
            age: 0,
            email: 'example@example.com',
            password: 'example',
        });
    }).toThrow(/Age must be between 1 and 140/);
});

test('User should throw when age is undefined', () => {
    expect(() => {
        new UserRecord({
            name: 'Example',
            age: 141,
            email: 'example@example.com',
            password: 'example',
        });
    }).toThrow(/Age must be between 1 and 140/);
});

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import * as passportJWT from 'passport-jwt';

import {
  VerifyCallback,
  VerifiedCallback,
} from 'passport-jwt';
import { JWT_SECRET } from '../config/config';
import { ValidationError } from '../utils/handleError';
import { UserRecord } from '../records/user.record';

interface Payload {
    id: string
    email: string;
    name: string;
    age: number;
}

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const configJWTStrategy = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

// eslint-disable-next-line consistent-return
passport.use('login', new LocalStrategy({ usernameField: 'email', session: false }, async (name, password, done: VerifiedCallback) => {
  try {
    const findUser = (await UserRecord.getOneByEmail(name));

    if (!findUser) {
      throw new ValidationError('Your Email is wrong', 404);
    }

    const passwordMatch = await compare(password, findUser.password);
    if (!passwordMatch) {
      throw new ValidationError('Wrong password', 404);
    }
    return done(null, findUser);
  } catch (e) {
    done(e);
  }
}));

const verifyUser: VerifyCallback = async (payload: Payload, done) => {
  try {
    const user = await UserRecord.getOneById(payload.id);

    if (!user) {
      throw new Error();
    }
    done(null, user);
  } catch (er) {
    done(er);
  }
};

passport.use('userAccess', new JWTStrategy(configJWTStrategy, verifyUser));

export default passport;

import { ironSession, withIronSession } from 'next-iron-session';

const initSession = {
  password: `${process.env.COOKIE_PASSWORD}`,
  cookieName: `${process.env.COOKIE_NAME}`,
  ttl: 60 * 60 * 24 * 5 * 1000, //5 days
  cookieOptions: {
    secure: process.env.NODE_ENV === 'development' ? false : true,
    maxAge: 60 * 60 * 24 * 5 * 1000,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    overwrite: true,
  },
};

/**
 * @description  set session on middleware
 */
const session = ironSession(initSession);

/**
 * @description Session handler for api routes
 * @param       {*} handler
 * @returns     session cookie
 */
const withSession = (handler) => {
  return withIronSession(handler, initSession);
};

export { session, withSession };

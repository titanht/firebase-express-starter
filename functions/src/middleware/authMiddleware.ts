import { NextFunction, Response } from 'express';
import { firebase } from '../lib/firebase';
import AuthenticationError from '../lib/errors/authenticationError';
import { RequestExtended } from '../lib/sharedTypes';

export default async (
  req: RequestExtended,
  _res: Response,
  next: NextFunction
) => {
  if (!req.token) {
    next(new AuthenticationError('Token Not Provided'));
  }

  try {
    await firebase.auth().signInWithCustomToken(req.token as string);
  } catch (err) {
    next(new AuthenticationError('Invalid Token'));
  }

  next();
};
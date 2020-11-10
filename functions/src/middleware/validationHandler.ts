import { Request, Response, NextFunction } from 'express';
import {
  validationResult,
  ValidationChain,
  ErrorFormatter,
} from 'express-validator';
import ValidationError from '../lib/errors/validationError';

const errorCb = (req: Request, res: Response, next: NextFunction) => {
  const format: ErrorFormatter<String> = ({ msg }) => {
    return `${msg}`;
  };
  const result = validationResult(req).formatWith(format);

  if (!result.isEmpty()) {
    return next(new ValidationError(result.mapped()));
  }
  next();
};

export default (validationRules: ValidationChain[]) => [
  ...validationRules,
  errorCb,
];

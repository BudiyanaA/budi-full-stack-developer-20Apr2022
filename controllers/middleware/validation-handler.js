import initMiddleware from '../../utils/initMiddleware';
import { validationResult } from 'express-validator';

/**
 * @description Middleware Validation
 * @param       {Array} validations
 * @returns     {success, errors}
 */
const validateMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    let err = {};
    errors.array().map(({ param, msg }) => {
      err[`${param}`] = msg;
    });

    return res.status(400).json({ success: false, errors: err });
  };
};

// Base validation
const validations = (array) =>
  initMiddleware(validateMiddleware(array, validationResult));
/**
 * @description Validation handling for api route
 * @param       {*} req
 * @param       {*} res
 * @param       {array} checkValidation
 * @returns     print errors
 */
const validationHandler = async (req, res, checkValidation) => {
  await checkValidation(req, res);

  const errors = validationResult(req);

  return !errors.isEmpty && res.status(422).json({ errors });
};

export { validationHandler, validations };

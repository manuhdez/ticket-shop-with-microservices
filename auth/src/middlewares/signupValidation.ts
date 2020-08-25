import { body } from 'express-validator';

export const emailValidation = body('email')
  .isEmail()
  .withMessage('Please enter a valid email.');

export const passwordValidation = body('password')
  .trim()
  .isLength({ min: 4, max: 20 })
  .withMessage('Password must be between 4 and 20 characters long.');

export const signupValidation = [emailValidation, passwordValidation];

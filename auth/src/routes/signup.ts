import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';

// middlewares
import { signupValidation } from '../middlewares/signupValidation';
import { RequestValidationError } from '../errors/RequestValidationError';
import DatabaseException from '../errors/DatabaseException';

const router = Router();

router.post(
  '/api/users/signup',
  signupValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    try {
      const user = User.createUser({ email, password });
      await user.save();

      // Generate a jwt token
      const payload = { id: user.id, email };
      const token = jwt.sign(payload, 'auth-ticket-secret-key', {
        expiresIn: '15min',
      });

      // Store token on the session object
      req.session = { jwt: token };

      return res.status(201).json({ user });
    } catch (e) {
      throw new DatabaseException(e.message);
    }
  }
);

export { router as signupRouter };

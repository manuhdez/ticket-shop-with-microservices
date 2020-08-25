import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';

// middlewares
import { signupValidation } from '../middlewares/signupValidation';

const router = Router();

router.post(
  '/api/users/signup',
  signupValidation,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { email, password } = req.body;

    res.status(200).json({ email, password });
  }
);

export { router as signupRouter };

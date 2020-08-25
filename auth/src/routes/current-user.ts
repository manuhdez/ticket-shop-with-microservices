import { Router } from 'express';

const router = Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Hello currentuser');
});

export { router as currentUserRouter };

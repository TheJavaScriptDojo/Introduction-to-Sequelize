import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) =>
  res.status(200).json({
    message: 'Welcome to Books REST API by The JavaScript Dojo',
  }),
);

router.all('*', (req, res, next) =>
  res.status(404).json({
    message: 'Route un-available',
  }),
);

export default router;

import express from 'express';
import user from './user';
import product from './product';

const router = express.Router();

router.use('/user', user);
router.use('/product', product);

export default router;

import express from 'express';
import user from './user';
import product from './product';
import sale from './sale';

const router = express.Router();

router.use('/user', user);
router.use('/product', product);
router.use('/sale', sale);

export default router;

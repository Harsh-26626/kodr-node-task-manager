import express from 'express';
import { Login, SignUp } from '../controllers/AuthController.js';
import {VerifyFields} from '../middleware/VerifyFields.js';

const router = express.Router();

router.route('/signup')
    .post(VerifyFields('signup'), SignUp);

router.route('/login')
    .post(VerifyFields('login'), Login);

export default router;
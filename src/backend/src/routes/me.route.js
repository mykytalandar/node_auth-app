import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authController } from '../controllers/auth.controller.js';
import { catchError } from '../utils/catchError.js'

export const meRouter = new express.Router();

meRouter.get('/me', authMiddleware, catchError(authController.me));

import { User } from '../models/user.js';
import 'dotenv/config';
import { userService } from '../services/user.service.js';
import { jwtService } from '../services/jwt.service.js';
import { createApiError } from '../errors/ApiError.js';
import { ApiError } from '../exeptions/api.error.js';

function validateName(value) {
  if (!value) {
    return 'Name is required';
  }

  if (value.length < 2) {
    return 'At least 2 characters';
  }

  return '';
}

function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }

  return '';
}

function validatePassword(value) {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }

  return '';
}

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (errors.name || errors.email || errors.password) {
    throw ApiError.badRequest('Bad request', errors);
  }

  await userService.register(name, email, password);

  res.send({ message: 'OK' });
};

const activate = async (req, res) => {
  const { activationToken } = req.params;
  const user = await User.findOne({ where: { activationToken } });

  if (!user) {
    res.sendStatus(404);

    return;
  }
  user.activationToken = null;
  await user.save();

  console.log(process.env.SERVER_HOST);

  res.redirect(`${process.env.CLIENT_HOST}/`);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);

  if (!user || user.password !== password) {
    throw createApiError('Invalid email or password', 401);
  }

  if (user.activationToken !== null) {
    throw createApiError('Account is not activated. Check your email!', 401);
  }

  const normalizedUser = userService.normalizeData(user);
  const accessToken = jwtService.sign(normalizedUser);

  res.send({
    user: normalizedUser,
    accessToken,
  });
};

const me = async (req, res) => {
  const user = await userService.findByEmail(req.user.email);

  if (!user) {
    throw new Error('User not found');
  }

  res.send(user);
};

export const authController = {
  register,
  activate,
  login,
  me,
};

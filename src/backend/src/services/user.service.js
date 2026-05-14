import { createApiError } from '../errors/ApiError.js';
import { ApiError } from '../exeptions/api.error.js';
import { User } from '../models/user.js';
import { emailService } from '../services/email.service.js';
import { v4 as uuidvv4 } from 'uuid';

function getAllActivated() {
  return User.findAll({
    where: {
      activationToken: null,
    },
  });
}

function normalizeData({ id, name, email }) {
  return { id, name, email };
}

function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function register(name, email, password) {
  const activationToken = uuidvv4();

  const existUser = await findByEmail(email);

  if (existUser) {
    throw ApiError.badRequest('User already exists', {
      email: 'User already exists',
    });
  }

  await emailService.sendActivationEmail(email, activationToken);
}

export const userService = {
  getAllActivated,
  normalizeData,
  findByEmail,
  register,
};

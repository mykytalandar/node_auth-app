import { User } from '../models/user.js';
import { userService } from '../services/user.service.js';

const getAllActivated = async (req, res) => {
  const users = await userService.getAllActivated();

  res.statusCode = 200;
  res.send(users.map(userService.normalizeData));
};

export const userController = {
  getAllActivated,
};

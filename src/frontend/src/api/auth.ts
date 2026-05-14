import axios from 'axios';
import { accessTokenService } from '../utils/accessTokenService';

type CreatePostBody = {
  name: string;
  email: string;
  password: string;
};

type CreatePostResponse = CreatePostBody & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

type LoginPostBody = Omit<CreatePostBody, 'name'>;

type LoginPostResponse = {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
  };
};

export async function register(data: CreatePostBody) {
  try {
    const response = await axios.post<CreatePostResponse>(
      'http://localhost:3005/registration',
      data,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Registration failed', {
        cause: error,
      });
    }

    throw new Error('Unknown error', {
      cause: error,
    });
  }
}

export async function login(data: LoginPostBody) {
  try {
    const response = await axios.post<LoginPostResponse>(
      'http://localhost:3005/login',
      data,
    );

    const accessToken = response.data.accessToken || '';

    accessTokenService.save(accessToken);

    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Log in failed', {
        cause: error,
      });
    }
  }
}

export async function checkAuth() {
  try {
    const token = accessTokenService.get();

    if (!token) {
      return;
    }

    const response = await axios.get('http://localhost:3005/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Authorization failed ', {
        cause: error,
      });
    }
  }
}

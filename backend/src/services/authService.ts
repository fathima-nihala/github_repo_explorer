import User from '../models/User';
import { generateToken } from '../utils/jwt';

export class AuthService {
  async register(username: string, email: string, password: string) {
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      throw new Error('User already exists with this email or username');
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = generateToken({ 
      id: user._id, 
      username: user.username, 
      email: user.email 
    });

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    };
  }

  async login(email: string, password: string) {
    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken({ 
      id: user._id, 
      username: user.username, 
      email: user.email 
    });

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    };
  }

  async getProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}
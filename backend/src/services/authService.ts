
import User from '../models/User';
import { generateToken } from '../utils/jwt';

export class AuthService {
  async register(username: string, email: string, password: string) {
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      throw new Error('User already exists with this email or username');
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken({ 
      id: user._id.toString(),   // ✅ safely convert ObjectId -> string
      username: user.username,
      email: user.email
    });

    return {
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email
      },
      token
    };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken({ 
      id: user._id.toString(),
      username: user.username,
      email: user.email
    });

    return {
      user: {
        id: user._id.toString(),
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
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}

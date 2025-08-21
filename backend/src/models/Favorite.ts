import mongoose, { Schema } from 'mongoose';
import { IFavorite } from '../types';

const FavoriteSchema = new Schema<IFavorite>({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  repoId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
  stargazersCount: {
    type: Number,
    default: 0
  },
  htmlUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique favorite per user per repo
FavoriteSchema.index({ userId: 1, repoId: 1 }, { unique: true });

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);
import Favorite from '../models/Favorite';
import { GitHubRepo } from '../types';

export class FavoriteService {
  async addFavorite(userId: string, repo: GitHubRepo) {
    // Check if already favorited
    const existingFavorite = await Favorite.findOne({ 
      userId, 
      repoId: repo.id 
    });

    if (existingFavorite) {
      throw new Error('Repository is already in favorites');
    }

    const favorite = new Favorite({
      userId,
      repoId: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || '',
      language: repo.language || '',
      stargazersCount: repo.stargazers_count,
      htmlUrl: repo.html_url
    });

    await favorite.save();
    return favorite;
  }

  async removeFavorite(userId: string, repoId: number) {
    const favorite = await Favorite.findOneAndDelete({ 
      userId, 
      repoId 
    });

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    return favorite;
  }

  async getFavorites(userId: string) {
    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });
    return favorites;
  }

  async isFavorite(userId: string, repoId: number): Promise<boolean> {
    const favorite = await Favorite.findOne({ userId, repoId });
    return !!favorite;
  }
}
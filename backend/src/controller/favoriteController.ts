// import { Response } from 'express';
// import { FavoriteService } from '../services/favoriteService';
// import { AuthRequest } from '../types';

// const favoriteService = new FavoriteService();

// export class FavoriteController {
//   async addFavorite(req: AuthRequest, res: Response) {
//     try {
//       const userId = req.user!.id;
//       const repoData = req.body;

//       if (!repoData.id || !repoData.name || !repoData.full_name || !repoData.html_url) {
//         return res.status(400).json({
//           success: false,
//           message: 'Required repository data is missing'
//         });
//       }

//       const favorite = await favoriteService.addFavorite(userId, repoData);

//       res.status(201).json({
//         success: true,
//         message: 'Repository added to favorites',
//         data: favorite
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error instanceof Error ? error.message : 'Failed to add favorite'
//       });
//     }
//   }

//   async removeFavorite(req: AuthRequest, res: Response) {
//     try {
//       const userId = req.user!.id;
//       const { repoId } = req.params;

//       const favorite = await favoriteService.removeFavorite(userId, Number(repoId));

//       res.json({
//         success: true,
//         message: 'Repository removed from favorites',
//         data: favorite
//       });
//     } catch (error) {
//       res.status(404).json({
//         success: false,
//         message: error instanceof Error ? error.message : 'Failed to remove favorite'
//       });
//     }
//   }

//   async getFavorites(req: AuthRequest, res: Response) {
//     try {
//       const userId = req.user!.id;
//       const favorites = await favoriteService.getFavorites(userId);

//       res.json({
//         success: true,
//         data: favorites
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error instanceof Error ? error.message : 'Failed to fetch favorites'
//       });
//     }
//   }

//   async checkFavorite(req: AuthRequest, res: Response) {
//     try {
//       const userId = req.user!.id;
//       const { repoId } = req.params;

//       const isFavorite = await favoriteService.isFavorite(userId, Number(repoId));

//       res.json({
//         success: true,
//         data: { isFavorite }
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error instanceof Error ? error.message : 'Failed to check favorite status'
//       });
//     }
//   }
// }


import { Response, Request } from 'express';
import { FavoriteService } from '../services/favoriteService';
import { AuthRequest, GitHubRepo } from '../types';

const favoriteService = new FavoriteService();

export class FavoriteController {
  // Add Favorite
  async addFavorite(
    req: AuthRequest & Request<{}, {}, GitHubRepo>, // ✅ body is typed as GitHubRepo
    res: Response
  ) {
    try {
      const userId = req.user!.id;
      const repoData = req.body;

      if (!repoData || !repoData.id || !repoData.name || !repoData.full_name || !repoData.html_url) {
        return res.status(400).json({
          success: false,
          message: 'Required repository data is missing',
        });
      }

      const favorite = await favoriteService.addFavorite(userId, repoData);

      res.status(201).json({
        success: true,
        message: 'Repository added to favorites',
        data: favorite,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to add favorite',
      });
    }
  }

  // Remove Favorite
  async removeFavorite(
    req: AuthRequest & Request<{ repoId: string }>, // ✅ params contain repoId
    res: Response
  ) {
    try {
      const userId = req.user!.id;
      const { repoId } = req.params;

      const favorite = await favoriteService.removeFavorite(userId, Number(repoId));

      res.json({
        success: true,
        message: 'Repository removed from favorites',
        data: favorite,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to remove favorite',
      });
    }
  }

  // Get Favorites
  async getFavorites(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const favorites = await favoriteService.getFavorites(userId);

      res.json({
        success: true,
        data: favorites,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch favorites',
      });
    }
  }

  // Check if Repo is Favorite
  async checkFavorite(
    req: AuthRequest & Request<{ repoId: string }>, // ✅ params contain repoId
    res: Response
  ) {
    try {
      const userId = req.user!.id;
      const { repoId } = req.params;

      const isFavorite = await favoriteService.isFavorite(userId, Number(repoId));

      res.json({
        success: true,
        data: { isFavorite },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to check favorite status',
      });
    }
  }
}

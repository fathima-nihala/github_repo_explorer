import { Request, Response } from 'express';
import { GitHubService } from '../services/githubService';

const githubService = new GitHubService();

export class GitHubController {
  async searchRepositories(req: Request, res: Response) {
    try {
      const { q: query, page = 1, per_page: perPage = 30 } = req.query;

      if (!query || typeof query !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const result = await githubService.searchRepositories(
        query,
        Number(page),
        Number(perPage)
      );

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Search failed'
      });
    }
  }

  async getRepositoryDetails(req: Request, res: Response) {
    try {
      const { owner, repo } = req.params;

      const result = await githubService.getRepositoryDetails(owner, repo);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch repository details'
      });
    }
  }
}
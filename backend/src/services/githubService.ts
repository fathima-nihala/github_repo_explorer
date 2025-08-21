import axios from 'axios';
import { GitHubSearchResponse, GitHubRepo } from '../types';

export class GitHubService {
  private apiUrl = 'https://api.github.com';
  private headers: any;

  constructor() {
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GitHub-Repo-Explorer'
    };

    // Add GitHub token if available for higher rate limits
    if (process.env.GITHUB_TOKEN) {
      this.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }
  }

  async searchRepositories(query: string, page = 1, perPage = 30): Promise<GitHubSearchResponse> {
    try {
      const response = await axios.get(`${this.apiUrl}/search/repositories`, {
        headers: this.headers,
        params: {
          q: query,
          page,
          per_page: perPage,
          sort: 'stars',
          order: 'desc'
        }
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`GitHub API Error: ${error.response?.data?.message || error.message}`);
      }
      throw new Error('Failed to search repositories');
    }
  }

  async getRepositoryDetails(owner: string, repo: string): Promise<GitHubRepo> {
    try {
      const response = await axios.get(`${this.apiUrl}/repos/${owner}/${repo}`, {
        headers: this.headers
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`GitHub API Error: ${error.response?.data?.message || error.message}`);
      }
      throw new Error('Failed to fetch repository details');
    }
  }
}
import { Router } from 'express';
import { GitHubController } from '../controller/githubController';
import { authenticate } from '../middleware/auth';

const router = Router();
const githubController = new GitHubController();

router.get('/search', authenticate, githubController.searchRepositories);
router.get('/repos/:owner/:repo', authenticate, githubController.getRepositoryDetails);

export default router;
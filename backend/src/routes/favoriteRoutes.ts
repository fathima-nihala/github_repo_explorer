import { Router } from 'express';
import { FavoriteController } from '../controller/favoriteController';
import { authenticate } from '../middleware/auth';

const router = Router();
const favoriteController = new FavoriteController();

router.post('/', authenticate, favoriteController.addFavorite);
router.delete('/:repoId', authenticate, favoriteController.removeFavorite);
router.get('/', authenticate, favoriteController.getFavorites);
router.get('/check/:repoId', authenticate, favoriteController.checkFavorite);

export default router;
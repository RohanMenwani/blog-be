import { Router } from 'express';
import {
    createRating,
    getRatingsByPostId,
    getRatingsByPostSlug,
    getRatingStatsByPostId,
    getRatingStatsByPostSlug,
} from '../controllers/ratingController';

const router = Router();

router.post('/', createRating);

router.get('/post/:postId', getRatingsByPostId);

router.get('/slug/:slug', getRatingsByPostSlug);

router.get('/stats/post/:postId', getRatingStatsByPostId);

router.get('/stats/slug/:slug', getRatingStatsByPostSlug);

export default router;

import { Router } from 'express';
import {
    createComment,
    getCommentsByPostId,
    getCommentsByPostSlug,
} from '../controllers/commentController';

const router = Router();

router.post('/', createComment);

router.get('/post/:postId', getCommentsByPostId);

router.get('/slug/:slug', getCommentsByPostSlug);

export default router;

import { Router } from 'express';
import { createPost, getAllPosts, getPostBySlug } from '../controllers/postController';

const router = Router();

router.post('/', createPost);

router.get('/', getAllPosts);

router.get('/:slug', getPostBySlug);

export default router;

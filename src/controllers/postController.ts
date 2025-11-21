import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/postService';
import { CreatePostDto } from '../types/post.types';

const postService = new PostService();

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const data: CreatePostDto = req.body;

        if (!data.title || !data.body) {
            res.status(400).json({
                success: false,
                message: 'Title and body are required',
            });
            return;
        }

        const post = await postService.createPost(data);

        res.status(201).json({
            success: true,
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllPosts = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const posts = await postService.getAllPosts();

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};

export const getPostBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { slug } = req.params;

        const post = await postService.getPostBySlug(slug);

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        next(error);
    }
};

import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/commentService';
import { CreateCommentDto } from '../types/comment.types';

const commentService = new CommentService();

export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const data: CreateCommentDto = req.body;

        if (!data.postId || !data.author || !data.comment) {
            res.status(400).json({
                success: false,
                message: 'Post ID, author, and comment are required',
            });
            return;
        }

        const comment = await commentService.createComment(data);

        res.status(201).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

export const getCommentsByPostId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { postId } = req.params;

        const comments = await commentService.getCommentsByPostId(postId);

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

export const getCommentsByPostSlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { slug } = req.params;

        const comments = await commentService.getCommentsByPostSlug(slug);

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

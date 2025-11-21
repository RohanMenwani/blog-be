import { Request, Response, NextFunction } from 'express';
import { RatingService } from '../services/ratingService';
import { CreateRatingDto } from '../types/rating.types';

const ratingService = new RatingService();

export const createRating = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const data: CreateRatingDto = req.body;

        if (!data.postId || !data.author || !data.rating) {
            res.status(400).json({
                success: false,
                message: 'Post ID, author, and rating are required',
            });
            return;
        }

        const rating = await ratingService.createRating(data);

        res.status(201).json({
            success: true,
            data: rating,
        });
    } catch (error) {
        next(error);
    }
};

export const getRatingsByPostId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { postId } = req.params;

        const ratings = await ratingService.getRatingsByPostId(postId);

        res.status(200).json({
            success: true,
            count: ratings.length,
            data: ratings,
        });
    } catch (error) {
        next(error);
    }
};

export const getRatingsByPostSlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { slug } = req.params;

        const ratings = await ratingService.getRatingsByPostSlug(slug);

        res.status(200).json({
            success: true,
            count: ratings.length,
            data: ratings,
        });
    } catch (error) {
        next(error);
    }
};

export const getRatingStatsByPostId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { postId } = req.params;

        const stats = await ratingService.getRatingStatsByPostId(postId);

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};

export const getRatingStatsByPostSlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { slug } = req.params;

        const stats = await ratingService.getRatingStatsByPostSlug(slug);

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};

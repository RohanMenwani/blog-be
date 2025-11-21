import { Rating, IRating } from '../models/Rating';
import { Post } from '../models/Post';
import { ApiError } from '../utils/ApiError';
import { CreateRatingDto, RatingStatsResponse } from '../types/rating.types';
import mongoose from 'mongoose';

export class RatingService {
    async createRating(data: CreateRatingDto): Promise<IRating> {
        if (!mongoose.Types.ObjectId.isValid(data.postId)) {
            throw new ApiError(400, 'Invalid post ID');
        }

        const postExists = await Post.findById(data.postId);
        if (!postExists) {
            throw new ApiError(404, 'Post not found');
        }

        if (data.rating < 1 || data.rating > 5) {
            throw new ApiError(400, 'Rating must be between 1 and 5');
        }

        try {
            const rating = await Rating.create(data);
            return rating;
        } catch (error: any) {
            if (error.code === 11000) {
                throw new ApiError(400, 'You have already rated this post');
            }
            throw error;
        }
    }

    async getRatingsByPostId(postId: string): Promise<IRating[]> {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new ApiError(400, 'Invalid post ID');
        }

        const ratings = await Rating.find({ postId })
            .sort({ createdAt: -1 })
            ;

        return ratings;
    }

    async getRatingsByPostSlug(slug: string): Promise<IRating[]> {
        const post = await Post.findOne({ slug });

        if (!post) {
            throw new ApiError(404, 'Post not found');
        }

        const ratings = await Rating.find({ postId: post._id })
            .sort({ createdAt: -1 })
            ;

        return ratings;
    }

    async getRatingStatsByPostId(postId: string): Promise<RatingStatsResponse> {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new ApiError(400, 'Invalid post ID');
        }

        const stats = await Rating.aggregate([
            { $match: { postId: new mongoose.Types.ObjectId(postId) } },
            {
                $group: {
                    _id: '$postId',
                    averageRating: { $avg: '$rating' },
                    ratingCount: { $sum: 1 },
                    ratings: {
                        $push: '$rating',
                    },
                },
            },
        ]);

        if (stats.length === 0) {
            return {
                postId,
                averageRating: 0,
                ratingCount: 0,
                ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            };
        }

        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        stats[0].ratings.forEach((rating: number) => {
            ratingDistribution[rating as keyof typeof ratingDistribution]++;
        });

        return {
            postId,
            averageRating: Math.round(stats[0].averageRating * 10) / 10,
            ratingCount: stats[0].ratingCount,
            ratings: ratingDistribution,
        };
    }

    async getRatingStatsByPostSlug(slug: string): Promise<RatingStatsResponse> {
        const post = await Post.findOne({ slug });

        if (!post) {
            throw new ApiError(404, 'Post not found');
        }

        return this.getRatingStatsByPostId(post._id.toString());
    }
}

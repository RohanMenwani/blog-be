import { Post, IPost } from '../models/Post';
import { Comment } from '../models/Comment';
import { Rating } from '../models/Rating';
import { ApiError } from '../utils/ApiError';
import { CreatePostDto, PostWithStats } from '../types/post.types';

export class PostService {
    async createPost(data: CreatePostDto): Promise<IPost> {
        try {
            const post = await Post.create(data);
            return post;
        } catch (error: any) {
            if (error.code === 11000) {
                throw new ApiError(400, 'A post with this slug already exists');
            }
            throw error;
        }
    }

    async getAllPosts(): Promise<IPost[]> {
        const posts = await Post.find().sort({ date: -1 });
        return posts;
    }

    async getPostBySlug(slug: string): Promise<PostWithStats> {
        const post = await Post.findOne({ slug }).lean();

        if (!post) {
            throw new ApiError(404, 'Post not found');
        }

        const commentCount = await Comment.countDocuments({ postId: post._id });

        const ratingStats = await Rating.aggregate([
            { $match: { postId: post._id } },
            {
                $group: {
                    _id: '$postId',
                    averageRating: { $avg: '$rating' },
                    ratingCount: { $sum: 1 },
                },
            },
        ]);

        const stats = ratingStats[0] || { averageRating: 0, ratingCount: 0 };

        return {
            ...post,
            _id: post._id.toString(),
            commentCount,
            averageRating: Math.round(stats.averageRating * 10) / 10,
            ratingCount: stats.ratingCount,
        };
    }

    async getPostById(id: string): Promise<IPost> {
        const post = await Post.findById(id);

        if (!post) {
            throw new ApiError(404, 'Post not found');
        }

        return post;
    }
}

import { Comment, IComment } from '../models/Comment';
import { Post } from '../models/Post';
import { ApiError } from '../utils/ApiError';
import { CreateCommentDto } from '../types/comment.types';
import mongoose from 'mongoose';

export class CommentService {
    async createComment(data: CreateCommentDto): Promise<IComment> {
        if (!mongoose.Types.ObjectId.isValid(data.postId)) {
            throw new ApiError(400, 'Invalid post ID');
        }

        const postExists = await Post.findById(data.postId);
        if (!postExists) {
            throw new ApiError(404, 'Post not found');
        }

        const comment = await Comment.create(data);
        return comment;
    }

    async getCommentsByPostId(postId: string): Promise<IComment[]> {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new ApiError(400, 'Invalid post ID');
        }

        const comments = await Comment.find({ postId })
            .sort({ createdAt: -1 })

        return comments;
    }

    async getCommentsByPostSlug(slug: string): Promise<IComment[]> {
        const post = await Post.findOne({ slug });

        if (!post) {
            throw new ApiError(404, 'Post not found');
        }

        const comments = await Comment.find({ postId: post._id })
            .sort({ createdAt: -1 })

        return comments;
    }
}

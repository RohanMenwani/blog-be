import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IComment extends Document {
    postId: Types.ObjectId;
    author: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: [true, 'Post ID is required'],
            index: true,
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
            maxlength: [100, 'Author name cannot exceed 100 characters'],
        },
        comment: {
            type: String,
            required: [true, 'Comment is required'],
            trim: true,
            maxlength: [1000, 'Comment cannot exceed 1000 characters'],
        },
    },
    {
        timestamps: true,
    }
);

commentSchema.index({ postId: 1, createdAt: -1 });

export const Comment = mongoose.model<IComment>('Comment', commentSchema);

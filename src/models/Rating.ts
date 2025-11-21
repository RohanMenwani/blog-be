import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IRating extends Document {
    postId: Types.ObjectId;
    author: string;
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
}

const ratingSchema = new Schema<IRating>(
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
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5'],
        },
        review: {
            type: String,
            trim: true,
            maxlength: [1000, 'Review cannot exceed 1000 characters'],
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

ratingSchema.index({ postId: 1, author: 1 }, { unique: true });
ratingSchema.index({ postId: 1, createdAt: -1 });

export const Rating = mongoose.model<IRating>('Rating', ratingSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    title: string;
    body: string;
    slug: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        body: {
            type: String,
            required: [true, 'Body is required'],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

postSchema.pre('save', function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});

// Index for faster queries
postSchema.index({ slug: 1 });
postSchema.index({ date: -1 });

export const Post = mongoose.model<IPost>('Post', postSchema);

export interface CreatePostDto {
    title: string;
    body: string;
    slug?: string;
    date?: Date;
}

export interface PostWithStats {
    _id: string;
    title: string;
    body: string;
    slug: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    commentCount?: number;
    averageRating?: number;
    ratingCount?: number;
}

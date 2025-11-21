export interface CreateRatingDto {
    postId: string;
    author: string;
    rating: number;
    review?: string;
}

export interface RatingResponse {
    _id: string;
    postId: string;
    author: string;
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RatingStatsResponse {
    postId: string;
    averageRating: number;
    ratingCount: number;
    ratings: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
}

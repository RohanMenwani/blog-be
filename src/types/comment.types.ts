export interface CreateCommentDto {
    postId: string;
    author: string;
    comment: string;
}

export interface CommentResponse {
    _id: string;
    postId: string;
    author: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Post {
  id: number;
  title: string;
  image: string;
  author: string;
  body: string;
  likes: any[];
  comments: any[];
}

export interface PostsResponse {
  content: Post[];
  page: number;
  totalElements: number;
  totalPages: number;
}


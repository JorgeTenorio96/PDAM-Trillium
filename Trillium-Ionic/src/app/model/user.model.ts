import { Post } from "./post.model";

export interface User {
    id: string;
    username: string;
    avatar: string;
    fullName: string;
    email: string;
    likes: Post[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    roles: UserRole[];
    createdAt: Date;
    lastPasswordChangeAt: Date;
    posts: Post[];
}

export enum UserRole {
    ROLE_ADMIN = 'ADMIN',
    ROLE_USER = 'USER',
}

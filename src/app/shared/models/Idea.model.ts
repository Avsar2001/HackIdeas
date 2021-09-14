import { User } from '../models/user.model';

export interface Idea {
    ideaId?: string;
    createdOn: string;
    createdBy: User;
    votes: string[];
    votesCount: number;
    saved: string[];
    title: string;
    description: string;
    tags: string[];
}
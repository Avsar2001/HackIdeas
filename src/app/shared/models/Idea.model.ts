import { User } from '../models/user.model';

export interface Idea {
    ideaId: number;
    createdOn: string;
    createdBy: User;
    votes: string[];
    saved: string[];
    title: string;
    description: string;
    tags: string[];
}
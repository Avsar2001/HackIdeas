import { User } from '../models/user.model';

export interface Idea {
    ideaId: string;
    createdOn: string;
    createdBy: User;
    votesCount: number;
    title: string;
    description: string;
    tags: string[];
}
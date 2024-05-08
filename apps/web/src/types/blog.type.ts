import { User } from './user.type';

export interface Blog {
  id: number;
  title: string;
  category: string;
  content: string;
  description: string;
  thumbnail: string;
  userId: number;
  createdAt: Date;
  updateAt: Date;
  deletedAt: Date | null;

  user: User;
}

export interface IFormCreateBlog {
  title: string;
  category: string;
  content: string;
  thumbnail: File[];
  description: string;
  userId?: number;
}

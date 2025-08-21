// import { Document } from 'mongoose';
// import { Request } from 'express';


// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;

//   comparePassword(candidatePassword: string): Promise<boolean>;

// }

// export interface IFavorite extends Document {
//   userId: string;
//   repoId: number;
//   name: string;
//   fullName: string;
//   description: string;
//   language: string;
//   stargazersCount: number;
//   htmlUrl: string;
//   createdAt: Date;
// }

// export interface GitHubRepo {
//   id: number;
//   name: string;
//   full_name: string;
//   description: string;
//   language: string;
//   stargazers_count: number;
//   html_url: string;
//   owner: {
//     login: string;
//     avatar_url: string;
//   };
//   created_at: string;
//   updated_at: string;
// }

// export interface GitHubSearchResponse {
//   total_count: number;
//   incomplete_results: boolean;
//   items: GitHubRepo[];
// }



// export interface AuthRequest extends Request<any, any, any, any> {
//   user?: {
//     id: string;
//     username: string;
//     email: string;
//   };
// }


import { Document, Types } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
  _id: Types.ObjectId;   // ✅ Explicitly type _id
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IFavorite extends Document {
  _id: Types.ObjectId;
  userId: string;
  repoId: number;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stargazersCount: number;
  htmlUrl: string;
  createdAt: Date;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepo[];
}

export interface AuthRequest extends Request<any, any, any, any> {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

import NextAuth from "next-auth";
import { Prisma, User } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = User;
}

declare type YTVideoObjItem = {
  kind: string;
  etag: string;
  id: { kind: string, videoId: string }
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number
      };
      medium: {
        url: string;
        width: number;
        height: number
      }
      high: {
        url: string;
        width: number;
        height: number
      }
    }
    channelTitle: string;
    publishTime: string;
  }
}

declare type YTVideoObjRes = {
  kind: string;
  etag: string;
  regionCode: string;
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: YTVideoObjItem[]
}

type PostWithComments = Prisma.PostGetPayload<{
  include: { comments: true }
}>

type PostWithCategoryAndSubcategorys = Prisma.PostGetPayload<{
  include: { 
    category: true,
    subcategory: true, 
  }
}>

type CommentWithReplies = Prisma.CommentGetPayload<{
  include: {
    author: true,
    replies: {
      include: {
        author: true
      }
    }
  }
}>

type ReplyComment = Omit<CommentWithReplies, "replies">

type NewReply = {
  text: string;
  parrentCommentId: string;
}

type PostWithEverything = Prisma.PostGetPayload<{
  include: {
    author: true,
    category: true,
    comments: {
      include: {
        author: true,
        replies: {
          include: {
            author: true
          }
        }
      }
    },
    subcategory: true
  }
}>
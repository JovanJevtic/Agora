import NextAuth from "next-auth";
import { User } from "@prisma/client";
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
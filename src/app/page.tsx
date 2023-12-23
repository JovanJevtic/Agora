import CurrentDate from "./components/CurrentDate/CurrentDate";
import type { User, Post } from "@prisma/client";
import TrendingNews from "./components/TrendingNews/TrendingNews";
import TrendingFromCategory from "./components/TrendingFromCategory/TrendingFromCategory";
import Footer from "./components/Footer";
import { YTVideoObjRes } from "@/types";
import LandingYoutubePreview from "./components/LandingYoutubePreview";
import youtubeService from "./libs/youtube";

const getTrendingPosts = async (): Promise<{ primary: Post, secondary: Post[] }> => {
  try {
    const res = await fetch("https://www.agoraportal.net/api/posts/trending", {
    // const res = await fetch("http://localhost:3000/api/posts/trending", {
      method: "GET",
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching...")
  }
};

const getYoutubeVideos = async (): Promise<YTVideoObjRes> => {
  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?channelId=${"UCcp3HUStwGKVdrqpANkgmlg"}&key=${process.env.YT_API_KEY}&maxResults=10&part=snippet,id&order=date&type=video&videoDuration=long`, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: 86400 
      }
    });
    const data = await res.json();
    return data as YTVideoObjRes;
  } catch (error: any) {
    throw new Error("Error fetching...")
  }
}

// const getYoutubeVideos2 = async () => {
  // "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOuy5OmK1RItsOkMGHXCddUCKu88xPeuE&channelId=Ccp3HUStwGKVdrqpANkgmlg&part=snippet,id&order=date&maxResults=50"

  // const response = await youtubeService.videos.list({
  //   part: 'snippet',
  //   maxResults: 50, // Set the number of videos you want to retrieve
  //   playlistId,
  // });
// }


export default async function Home() {
  const trendingPosts = await getTrendingPosts();
  const ytVideoListPromise = getYoutubeVideos();

  return (
    <div className="flex min-h-screen flex-col ">
      <div className="h-10 w-ful flex items-center mt-0 dark:bg-card bg-card">
        {/* <h1 className="font-bold min-[540px]:text-xl max-[540px]:text-sm flex-[5] max-[360px]:text-xs">Dobrodošli na Agora portal</h1> */}
        <div className="flex-[3] flex justify-center items-center h-full container">
          <CurrentDate />
        </div>
      </div>
      <TrendingNews primary={trendingPosts.primary} secondary={trendingPosts.secondary} />
      <div className="">
        <TrendingFromCategory category="Novosti" />

        <LandingYoutubePreview postsPromise={ytVideoListPromise} />

        <TrendingFromCategory category="Politika" />
        <TrendingFromCategory category="Kultura" />
        <TrendingFromCategory category="Sport" />
        <TrendingFromCategory category="Društvo" />
      </div>
    </div>
  );
}

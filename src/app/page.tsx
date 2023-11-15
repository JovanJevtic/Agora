import CurrentDate from "./components/CurrentDate/CurrentDate";
import type { User, Post } from '@prisma/client'
import TrendingNews from "./components/TrendingNews/TrendingNews";
import TrendingFromCategory from "./components/TrendingFromCategory/TrendingFromCategory";
import Footer from "./components/Footer";

const getTrendingPosts = async () => {
  const res = await fetch('https://www.agoraportal.net/api/posts/trending', {
    method: 'GET',
    cache: 'no-cache'
  });
  const data: Post[] = await res.json()
  return data;
}

export default async function Home() {
  const trendingPosts = await getTrendingPosts()
  return (
    <div className="flex min-h-screen flex-col ">
      <div className="h-10 w-ful flex items-center mt-0 bg-card">
        {/* <h1 className="font-bold min-[540px]:text-xl max-[540px]:text-sm flex-[5] max-[360px]:text-xs">Dobrodošli na Agora portal</h1> */}
        <div className="flex-[3] flex justify-start items-center h-full container">
          <CurrentDate />
        </div>
      </div>
      <TrendingNews posts={trendingPosts} />
      <div className="container">
        <TrendingFromCategory category="Novosti" />
        <TrendingFromCategory category="Politika" />
        <TrendingFromCategory category="Kultura" />
        <TrendingFromCategory category="Sport" />
        <TrendingFromCategory category="Drustvo" />
      </div>
    </div>
  )
}

import CurrentDate from "./components/CurrentDate/CurrentDate";
import type { User, Post } from '@prisma/client'
import TrendingNews from "./components/TrendingNews/TrendingNews";
import TrendingFromCategory from "./components/TrendingFromCategory/TrendingFromCategory";

const getTrendingPosts = async () => {
  const res = await fetch('http://localhost:3000/api/posts/trending', {
    method: 'GET',
    cache: 'no-cache'
  });
  const data: Post[] = await res.json()
  return data;
}

export default async function Home() {
  const trendingPosts = await getTrendingPosts()
  return (
    <main className="flex min-h-screen flex-col ">
      <div className="h-10 w-ful flex items-center">
        <h1 className="font-bold text-xl">Dobrodosli na Agora portal</h1>
        <div className="flex-1 flex justify-end items-center h-full">
        <CurrentDate />
        </div>
      </div>
      <TrendingNews posts={trendingPosts} />
      <TrendingFromCategory category="Novosti" />
      <TrendingFromCategory category="Sport" />
      {/* <TrendingFromCategory category="Kultura" />
      <TrendingFromCategory category="Drustvo" /> */}

    </main>
  )
}

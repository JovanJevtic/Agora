import { Category, Post, Subcategory } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

type Props = {
  title?: string;
  requestPromise: Promise<Post[]>;
  categoryHex: string;
  text?: string;
  subcategory?: boolean;
}

const PostPageTrendingCard: React.FunctionComponent<Props> = async ({ title, requestPromise, categoryHex, text, subcategory }) => {
  const trendingFromCategory = await requestPromise;

  if (trendingFromCategory.length < 1) {
    return null
  }  

  return (
    // <Card className="border-secondary">
    //   <CardHeader>
    //     <CardTitle>{title}</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <ul>
    //       {
    //         trendingFromCategory.map((post) => (
    //           <div key={post.id}>
    //             <p>{post.title}</p>
    //             <p>{post.subtitle}</p>
    //           </div>
    //         ))
    //       }
    //     </ul>
    //   </CardContent>
    // </Card>
    <div className="bg-card border-secondary rounded-md">
      <div className="pl-5 pt-3 border-solid border-b-[1px] border-secondary pb-3 rounded-t-md" style={{ background: !subcategory ? categoryHex : '#000' }}>
        {
          title &&
          <p className="text-xl">Aktuelno iz kategorije: <span className="font-bold">{title}</span></p>
        }
        {
          text && <p className="font-bold">{text}</p>
        }
      </div>
      <div className="pt-0">
        <ul>
          {
            trendingFromCategory.map((post) => (
             <Link href={`/post/${post.id}`} key={post.id}>
               <div className="pt-3 border-solid border-b-[1px] border-secondary pl-5 pr-5 pb-3 cursor-pointer transition hover:bg-secondary">
                <p className="line-clamp-2 text-sm">{post.title}</p>
                <p className="text-gray-500 line-clamp-2 text-sm">{post.subtitle}</p>
              </div>
             </Link>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default PostPageTrendingCard
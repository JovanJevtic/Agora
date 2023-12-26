import { Category, Post, Subcategory } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title?: string;
  requestPromise: Promise<Post[]>;
  categoryHex?: string;
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
      <div className="pl-5 pt-3 pr-5 border-solid border-b-[1px] border-secondary pb-3 rounded-t-md" style={{ background: categoryHex ? categoryHex : '' }}>
        {
          title &&
          <p className="text-xl text-white">Aktuelno iz kategorije: <span className="font-bold">{title}</span></p>
        }
        {
          text && <p className={`font-bold ${text === "Povezano" && `text-white`}`}>{text}</p>
        }
      </div>
      <div className="pt-0">
        <ul>
          {
            trendingFromCategory.map((post) => (
             <Link className="flex min-h-fit" href={`/post/${post.slug}`} key={post.id}>
                <div className="min-h-full bg-red-600 w-[100px] lg:w-[140px] relative">
                  <Image
                    src={post.image} alt="a"
                    fill
                    style={{objectFit:"cover", objectPosition: 'center'}}
                  />
                </div>
                <div className="flex-1 pt-3 border-solid border-b-[1px] border-secondary pl-5 pr-5 pb-3 cursor-pointer transition hover:bg-secondary">
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
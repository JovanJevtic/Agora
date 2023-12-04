import { YTVideoObjRes } from "@/types"
import YoutubeComponent from "./YoutubeComponent";
import { AspectRatio } from "@/app/components/ui/aspect-ratio"

type Props = {
    postsPromise: Promise<YTVideoObjRes>
}

const LandingYoutubePreview: React.FunctionComponent<Props> = async ({ postsPromise }) => {
    const posts = await postsPromise;

    return (
        <div className="bg-[#fb8401] mb-5 mt-3 pb-5">
            <div className="container py-5">
                <h1 className="text-4xl font-bold mb-10 mt-3 text-white text-center md:text-left">Iz Agorinog Studia</h1>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[30px] lg:grid-cols-3 lg:gap-0 justify-between lg:[&>*:nth-child(1)]:justify-start lg:[&>*:nth-child(2)]:justify-center lg:[&>*:nth-child(3)]:justify-end">
                    {
                        posts?.items?.map((post) => (
                            <div className="flex-1 flex justify-center"  key={post.id.videoId}>
                                {/* <AspectRatio className=" bg-red-700" ratio={16 / 9}> */}
                                    <YoutubeComponent opts={{ width: post.snippet.thumbnails.medium.width, height: post.snippet.thumbnails.medium.height }} videoId={post.id.videoId} />
                                {/* </AspectRatio> */}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )   
}

export default LandingYoutubePreview
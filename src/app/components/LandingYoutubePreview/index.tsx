import { YTVideoObjRes } from "@/types"
import YoutubeComponent from "./YoutubeComponent";

type Props = {
    postsPromise: Promise<YTVideoObjRes>
}

const LandingYoutubePreview: React.FunctionComponent<Props> = async ({ postsPromise }) => {
    const posts = await postsPromise;

    return (
        <div className="bg-red-600 mb-5 mt-3">
            <div className="container py-5">
                <h1 className="text-2xl font-bold mb-5">Iz Agorinog Studia</h1>
                <div className="w-full flex">
                    {
                        posts?.items?.map((post) => (
                            <YoutubeComponent opts={{ width: post.snippet.thumbnails.default.width, height: post.snippet.thumbnails.default.height }} key={post.id.videoId} videoId={post.id.videoId} />
                        ))
                    }
                </div>
            </div>
        </div>
    )   
}

export default LandingYoutubePreview
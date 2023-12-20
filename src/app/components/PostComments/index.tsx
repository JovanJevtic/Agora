import { CommentWithReplies } from "@/types";
import { Post } from "@prisma/client"
import PostComment from "./PostComment";
import AddCommentForm from "./AddCommentForm";

type Props = {
    comments: CommentWithReplies[];
    postId: string;
}
const PostComments = ({ comments, postId }: Props) => {
    return (
    <div>
        <div className="container">
            <h1 className="pb-5 font-bold text-xl">Komentari: </h1>
            <AddCommentForm postId={postId} />
        </div>
        {
            comments.map((comment) => (
                <PostComment key={comment.id} postId={postId} comment={comment} />
            ))
        }
    </div>
  )
}

export default PostComments
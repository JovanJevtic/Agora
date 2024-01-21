import { CommentWithReplies } from "@/types";

import AddCommentForm from "./AddCommentForm";


type Props = {
    comments: CommentWithReplies[];
    postId: string;
    postSlug: string;
}

const PostComments = ({ comments, postId, postSlug }: Props) => {
    
    return (
        <AddCommentForm postSlug={postSlug} comments={comments} postId={postId} />
    )
}

export default PostComments
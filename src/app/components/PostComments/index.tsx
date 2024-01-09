import { CommentWithReplies } from "@/types";
import { Comment, Post, User } from "@prisma/client"
import PostComment from "./PostComment";
import AddCommentForm from "./AddCommentForm";

import { useEffect, useOptimistic } from "react";
import { useSession } from "next-auth/react";
import { createComment } from "@/actions/createComments";

type Props = {
    comments: CommentWithReplies[];
    postId: string;
    postSlug: string;
}
const PostComments = ({ comments, postId, postSlug }: Props) => {
    // const [optimisticComments, addOptimisticComment] = useOptimistic<CommentWithReplies[]>(
    //     comments,
    //     (prevComments, optComments: CommentWithReplies) => {
    //         return [...prevComments, optComments]
    //     }
    // )


    return (
    // <div>
    //     <div className="container">
    //         <h1 className="pb-5 font-bold text-xl">Komentari: </h1>
    //         <AddCommentForm addOptimistic={addOptimisticComment} postId={postId} />
    //     </div>
    //     {
    //         optimisticComments.map((comment) => (
    //             <PostComment key={comment.id} postId={postId} comment={comment} />
    //         ))
    //     }
    // </div>
        <AddCommentForm createComment={createComment} postSlug={postSlug} comments={comments} postId={postId} />

  )
}

export default PostComments
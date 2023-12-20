'use client';

import { CommentWithReplies } from "@/types"
import Date from "./Date";
import Image from "next/image";
import { ArrowDown, ArrowDown01, ArrowUp, ChevronDown, ChevronUp, DeleteIcon, Loader, Loader2, Trash, Trash2, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import PostCommentForm from "./PostCommentForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
    comment: CommentWithReplies;
    postId: string;
}
const PostComment = ({ comment, postId }: Props) => {
    const [repliesShown, setRepliesShown] = useState(false);
    const [replyFormShown, setReplyFormShown] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: session, status } = useSession()
    const { refresh } = useRouter()

    const onDelete = async (commentId: string) => {
        try {
            const res = await fetch(`https://www.agoraportal.net/api/admin/comments`, {
                method: 'DELETE',
                body: JSON.stringify({ commentId })
            })
            
            const resData = await res.json();
            if (res.ok) {
                refresh()
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

  return (
    <div key={comment.id} className="border-t-[1px] border-solid border-secondary pt-5 pb-3 bg-black">
        <div className="container">
            <div className="w-full flex h-full">
                <div className="">
                    {
                        comment.author.image ? <Image alt="profile picture" width={24} height={24} className="rounded-[50%]" src={comment.author.image} /> 
                            : 
                        <div className="h-[27px] w-[27px] rounded-[50%] flex items-center justify-center bg-card">
                            <User size={13} />
                        </div>
                    }
                </div>
                <div className="flex-[1]">
                    <div className="flex items-center">
                        <p className="text-sm ml-3 font-bold">{comment.author.name}</p>
                        <Date createdAt={comment.createdAt} updatedAt={comment.updatedAt} />
                    </div>
                    
                    <div className="mt-1 ml-3">
                        <p className="text-sm">{comment.text}</p>
                    </div>

                    <div className="mt-1 mb-1 ml-3 flex items-center">
                        {/* <p className="text-xs text-gray-400">odgovori</p> */}
                        {/* <Button onClick={() => setReplyFormShown(true)} variant={"outline"} className="h-[30px] text-xs">odgovori</Button> */}
                        <div className="">
                            {
                                comment.replies.length > 0 && (
                                    <div className="mt-0 ml-0 flex pr-3 py-2 max-w-fit cursor-pointer rounded-3xl" onClick={() => {setRepliesShown(!repliesShown)}}>
                                        <div className="mr-1">
                                            { repliesShown ? <ChevronUp className="text-primary" size={16}  /> : <ChevronDown className="text-primary" size={16} /> }
                                        </div>
                                        <p className="text-xs text-primary flex">Odgovora: 
                                            <span className="ml-1">{ isSubmitting ? <Loader2 className="h-[20px] w-[20px]" /> : comment.replies.length}</span>
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                        <p className="text-xs cursor-pointer" onClick={() => setReplyFormShown(true)}>odgovori</p>
                    </div>

                    {
                        replyFormShown && (
                            <div className="ml-3">
                                <PostCommentForm setShown={setReplyFormShown} setIsSubmitting={setIsSubmitting} isReply={true} parrentCommentId={comment.id} postId={postId} />
                            </div>
                        )
                    }


                    {
                        repliesShown && <div className="ml-[30px] mt-3">
                            {/* <h1 className="text-sm mb-5">Odgovori:</h1> */}
                            {
                                (comment.replies?.map((reply) => (
                                    <div key={reply.id} className="mb-5 flex">
                                        <div className="flex items-start">
                                            <div className="mt-0">
                                                {
                                                    reply.author.image ? <Image alt="profile picture" width={24} height={24} className="rounded-[50%]" src={reply.author.image} /> 
                                                    : 
                                                    <div className="h-[27px] w-[27px] rounded-[50%] flex items-center justify-center bg-card">
                                                        <User size={13} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-[1]">
                                            <div className="flex items-center">
                                                <p className="text-sm ml-3 font-bold">{reply.author.name}</p>
                                                <Date createdAt={reply.createdAt} updatedAt={reply.updatedAt} />
                                                {/* {
                                                    session?.user.role === "admin" && (
                                                        <div className="flex h-full items-center ml-5">
                                                            <Trash2 className="text-red-700 mt-1 cursor-pointer" onClick={() => onDelete(comment.id)} size={20} />
                                                        </div>
                                                    )
                                                } */}
                                            </div>
                                            
                                            <div className="mt-1 ml-3">
                                                <p className="text-sm whitespace-normal max-w-[260px] md:max-w-lg lg:max-w-4xl" style={{ wordWrap: 'break-word' }}>{reply.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )))
                                }
                        </div>
                    }

                    {/* {
                        comment.replies?.map((reply) => (
                            <div>
                                <h1>Reply: {reply.text}</h1>
                            </div>
                        ))
                    } */}
                </div>
                {/* {
                    session?.user.role === "admin" && (
                        <div className="flex h-full items-center">
                            <Trash2 className="text-red-700 mt-1 cursor-pointer" onClick={() => onDelete(comment.id)} size={24} />
                        </div>
                    )
                } */}
            </div>
        </div>
    </div>
  )
}

export default PostComment
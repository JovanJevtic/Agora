'use client'
import Link from "next/link";
import { Button } from "../ui/button"

import { useRouter } from "next/navigation"

type Props = {
  postId: string;
  archived: boolean;
  slug: string;
}

const Btns: React.FunctionComponent<Props> = ({ postId, archived , slug}) => {
  const router  = useRouter()

  const deletePost = async (postId: string) => {
    try {
      const res = await fetch(
        `https://www.agoraportal.net/api/admin/deletePost?id=${postId}`,
        {
          method: 'DELETE'
        }
      );
      const data = await res.json();
      router.push('/admin')
    } catch (error) {
      return null;
    }
  }

  const archivePost = async () => {
    try {
      const res = await fetch(`https://www.agoraportal.net/api/admin/archive`, {
        method: 'PUT',
        body: JSON.stringify({ postId })
      })
      const resData = await res.json();
      router.push(`/admin/archived/${postId}`)
    } catch (error: any) {
      throw new Error(error)      
    }
  }

  const repostPost = async () => {
    try {
      const res = await fetch(`https://www.agoraportal.net/api/admin/repost`, {
        method: 'PUT',
        body: JSON.stringify({ postId })
      })
      const resData = await res.json();
      router.push(`/post/${postId}`)
    } catch (error: any) {
      throw new Error(error)      
    }
  }

  return (
    <div className="flex mb-5">
        <Link className="mr-3" href={`/admin/editPost/${slug}`}><Button variant={"secondary"}>Edit</Button></Link> 
        <Button onClick={() => {deletePost(postId)}} variant={"destructive"}>Ukloni</Button>
        <div className="ml-1">
          { 
            archived ? <Button onClick={() => {repostPost()}} variant={"outline"}>Ponovo objavi</Button> 
            : <Button onClick={() => {archivePost()}} variant={"outline"}>Arhiviraj</Button>
          }
        </div>
    </div>
  )
}

export default Btns
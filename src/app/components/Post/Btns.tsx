'use client'
import Link from "next/link";
import { Button } from "../ui/button"

import { useRouter } from "next/navigation"

type Props = {
    postId: string;
    // deletePost: (postId: string) => Promise<null>
}

const Btns: React.FunctionComponent<Props> = ({ postId }) => {
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

  return (
    <div className="flex mb-5">
        <Link className="mr-3" href={`/admin/editPost/${postId}`}><Button variant={"secondary"}>Edit</Button></Link> 
        <Button onClick={() => {deletePost(postId)}} variant={"destructive"}>Ukloni</Button>
    </div>
  )
}

export default Btns
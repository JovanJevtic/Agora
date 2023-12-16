'use client'
import Link from "next/link";
import { Button } from "../ui/button"

import { useRouter } from "next/navigation"
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
// import { DialogClose, DialogContent } from "@radix-ui/react-dialog";

type Props = {
  postId: string;
  archived: boolean;
  slug: string;
}

const Btns: React.FunctionComponent<Props> = ({ postId, archived , slug }) => {
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Obriši</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md border-secondary">
            <DialogHeader>
              <DialogTitle>Obriši</DialogTitle>
              <DialogDescription>
                Ako potvridš, objava će biti obrisana do daljnjeg!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <div>
                  <Button type="button" className="" variant={"destructive"} onClick={() => {deletePost(postId)}}>Obriši</Button>  
                  <DialogTrigger asChild>
                    <Button type="button" className="ml-3" variant="outline">Zatvori</Button>
                  </DialogTrigger>
                </div>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
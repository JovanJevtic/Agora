import { ImageResponse } from 'next/og'
import ImageComponent from 'next/image'
import { Post } from '@prisma/client'

export const runtime = 'edge'
 
export const alt = 'Agora'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image({ params }: { params: { id: string } }) {
  const post: Post = await fetch(`${process.env.BASE_URL}/api/posts/getOne?id=${params.id}`).then((res) =>
    res.json()
  )
 
  return new ImageResponse(
    (
      <ImageComponent
        alt={alt}
        src={post.image}
      />
    ),
    {
      ...size,
      
    }
  )
}
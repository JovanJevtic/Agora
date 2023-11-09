import { Post } from '../../../../prisma/generated/client'
import React from 'react'
import TrendingGrid from '../TrendingGrid/TrendingGrid'

type Props = {
    posts: Post[]
}

const TrendingNews: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <TrendingGrid posts={posts} />
  )
}

export default TrendingNews
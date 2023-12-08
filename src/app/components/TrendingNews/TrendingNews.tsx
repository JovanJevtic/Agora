import { Post } from '@prisma/client'
import React from 'react'
import TrendingGrid from '../TrendingGrid/TrendingGrid'

type Props = {
  primary: Post,
  secondary: Post[]
}

const TrendingNews: React.FunctionComponent<Props> = ({ primary, secondary }) => {
  return (
    <TrendingGrid primary={primary} secondary={secondary} />
  )
}

export default TrendingNews
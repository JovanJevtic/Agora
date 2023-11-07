'use client'

import Moment from "react-moment";
import 'moment/locale/sr'

type Props = {
    date: Date;
}
const TrendingNewsDate: React.FunctionComponent<Props> = ({date}) => {
  return (
    <Moment locale="sr" local format="DD/MM/YYYY" date={date} />
  )
}

export default TrendingNewsDate
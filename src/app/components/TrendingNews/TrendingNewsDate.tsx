'use client'

import Moment from "react-moment";
import 'moment/locale/sr'

type Props = {
  date: Date;
  full?: boolean;
}

const TrendingNewsDate: React.FunctionComponent<Props> = ({date, full}) => {
  return (
    <Moment locale="sr" local format={`${full ? "hh:mm DD/MM/YYYY": "DD/MM/YYYY"}`} date={date} />
  )
}

export default TrendingNewsDate
'use client'

import Moment from "react-moment";
import 'moment/locale/bs'

type Props = {
  date: Date;
  full?: boolean;
}

const TrendingNewsDate: React.FunctionComponent<Props> = ({date, full}) => {
  return (
    <Moment locale="bs" local format={`${full ? "dddd hh:mm DD/MM/YYYY": "DD/MM/YYYY"}`} date={date} />
  )
}

export default TrendingNewsDate
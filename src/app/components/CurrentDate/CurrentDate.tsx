'use client'

import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton";
import Moment from 'react-moment';
import 'moment/locale/sr';

const CurrentDate = () => {

    const [date, setDate] = useState();

    const getTime = () => {
        fetch('https://worldtimeapi.org/api/timezone/Europe/Belgrade')
            .then(response => response.json())
            .then(data => {
                setDate(data.datetime);
            });
    }
    useEffect(() => {
        getTime(); 
    }, [])

    if (!date) return <Skeleton className="h-4 w-20"></Skeleton>

    return (
        <p className="text-gray-400 min-[540px]:text-md max-[540px]:text-xs max-[420px]:xs right-0">
            <Moment locale="sr" local format="dddd DD/MM/YYYY">{date}</Moment>
        </p>
  )
}

export default CurrentDate
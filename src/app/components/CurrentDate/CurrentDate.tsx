'use client'

import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton";
import Moment from 'react-moment';
import 'moment/locale/bs';

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
        <p className="text-gray-30 text-xs right-0 text-right capitalize">
            <Moment locale="bs" local format="dddd DD/MM/YYYY">{date}</Moment>
        </p>
  )
}

export default CurrentDate
'use client';

import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Skeleton } from "../ui/skeleton";
import 'moment/locale/bs';

type Props = {
    createdAt: Date;
    updatedAt: Date;
}
const Date = ({ createdAt, updatedAt }: Props) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Skeleton className="h-[20px] w-[60px] ml-3"></Skeleton>
    }
    return (
    <div className="flex ml-3">
        <p className="text-xs text-gray-400"><Moment locale="bs" fromNow>{createdAt}</Moment></p>
        { createdAt !== updatedAt && <p className="text-xs text-gray-400 ml-2">Izmjenjeno: <Moment locale="bs" fromNow>{updatedAt}</Moment></p> }
    </div>
  )
}

export default Date
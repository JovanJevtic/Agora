'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

type Props = {
    text: string;
}

const AddCommentBtn = ({ text }: Props) => {
    const { pending } = useFormStatus()
    
    return (
    <Button 
        disabled={pending || text.length < 1 } 
        type="submit" className="h-[34px] text-xs"
    >
        Komentariši
        {
            (pending) && <Loader2 className="ml-2 mr-2 h-4 w-4 animate-spin" />
        }
    </Button>
  )
}

export default AddCommentBtn
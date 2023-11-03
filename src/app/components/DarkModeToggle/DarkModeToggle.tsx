'use client'

import React, { useEffect, useState } from 'react'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from '../ui/button'
import { Skeleton } from "@/app/components/ui/skeleton"

const DarkModeToggle = () => {
    const { setTheme, theme } = useTheme()

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return <Skeleton className="h-8 w-8 rounded-full" />

    return (
        <>
            {
                theme === "light" ? 
                    <Moon style={{cursor: 'pointer'}} onClick={() => setTheme("dark")} size={30} />
                    :
                    <Sun style={{cursor: 'pointer'}} onClick={() => setTheme("light")} size={30} />
            }
        </>
    )
}

export default DarkModeToggle
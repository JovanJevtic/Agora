'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import { Button } from '../ui/button'
import { Skeleton } from "@/app/components/ui/skeleton"
import { DarkModeSwitch } from 'react-toggle-dark-mode';


const DarkModeToggle = () => {
    const { setTheme, theme } = useTheme()

    const [mounted, setMounted] = useState(false);
    const [darkMode, setDarkMode] = useState<boolean>();

    useEffect(() => {
        setMounted(true);
        setDarkMode(theme == "light")
    }, []);

    if (!mounted || !theme) return <Skeleton className="h-8 w-8 rounded-full mr-5" />

    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(checked);
        setTheme(checked ? "light" : "dark")
    };

    return (
        // <>
        //     {
        //         theme === "light" ? 
        //             <Moon style={{cursor: 'pointer'}} onClick={() => setTheme("dark")} size={30} />
        //             :
        //             <Sun style={{cursor: 'pointer'}} onClick={() => setTheme("light")} size={30} />
        //     }
        // </>
        <DarkModeSwitch
            className='mr-5'
            checked={darkMode as boolean}
            onChange={toggleDarkMode}
            size={20}
            moonColor='#000'
            sunColor='#fafafa'
        />
    )
}

export default DarkModeToggle
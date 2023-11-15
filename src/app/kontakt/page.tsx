'use client'

import Link from 'next/link'
import React from 'react'
import { Card } from '../components/ui/card'

const About = () => {
  return (
    <div className='container'>
        <Card className='p-5 border-gray-600 mt-10'>
        <h1 className='mt-5 font-bold text-lg'>Kontaktirajte Nas</h1>

<p className='mt-3 text-sm'>Dobrodošli na našu kontakt stranicu! Ako želite ostati u kontaktu s nama ili pratiti najnovije vijesti i informacije o našem radu, slobodno koristite sljedeće linkove do naših društvenih mreža:</p>

<div className='flex flex-col mt-10'>
    <Link rel="noopener noreferrer" target="_blank" className='underline text-primary' href={'https://www.instagram.com/agoraportal_/'}>Instagram</Link>
    {/* <Link className='underline text-primary' href={''}>Facebook</Link> */}
    <Link rel="noopener noreferrer" target="_blank" className='underline text-primary' href={'https://www.tiktok.com/@agoraportal_'}>TikTok</Link>
    <Link rel="noopener noreferrer" target="_blank" className='underline text-primary' href={'https://www.youtube.com/@Agora-Portal'}>Youtube</Link>
    <Link rel="noopener noreferrer" target="_blank" className='underline text-primary' href={'https://twitter.com/agoraportal_'}>X</Link>
</div>

<p className='mt-5 text-sm'>
S pratnjom naših društvenih mreža možete biti sigurni da ćete uvijek biti u toku s najnovijim događanjima i sadržajem koji dijelimo. Također, slobodno nas kontaktirajte putem e-pošte ako imate bilo kakva pitanja ili zahtjeve.
</p>
        </Card>
    </div>
  )
}

export default About
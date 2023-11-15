import { Instagram, Twitter, X, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BsTiktok } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className="min-h-60 w-full bg-background mt-10">
        <div className='container flex flex-col h-full w-full'>
            <div>
                <h1 className="mt-5 font-bold lg:text-lg text-lg">Istraži Agoru</h1>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="grid flex-1 border-b-[1px] border-background border-solid w-full mt-5 min-[800px]:mb-1 ">
                    <ul className="flex-1 h-full items-center flex max-[600px]:flex-col max-[600px]:items-start">
                    <li className="text-sm font-bold text-white mr-10 max-[600px]:mb-3"><Link className="w-[100px]" href={'/'}>Početna</Link></li>
                        <li className="text-sm font-bold text-white mr-10 max-[600px]:mb-3"><Link className="w-[100px]" href={'/category/Novosti'}>Novosti</Link></li>
                        <li className="text-sm font-bold text-white mr-10 max-[600px]:mb-3"><Link className="w-[100px]" href={'/category/Politika'}>Politika</Link></li>
                        <li className="text-sm font-bold text-white mr-10 max-[600px]:mb-3"><Link className="w-[100px]" href={'/category/Kultura'}>Kultura</Link></li>
                        <li className="text-sm font-bold text-white mr-10 max-[600px]:mb-3"><Link className="w-[100px]" href={'/category/Sport'}>Sport</Link></li>
                        <li className="text-sm font-bold text-white mr-10"><Link className="w-[100px]" href={'/category/Drustvo'}>Društvo</Link></li>
                    </ul>
                </div>
                <div className="flex  max-[800px]:flex-col max-[800px]:mt-5 min-[800px]:mt-5">
                    <ul className="flex-1 h-full items-center flex max-[600px]:flex-col max-[600px]:items-start mb-5 max-[800px]:mt-3">
                        <li className="text-xs text-gray-800 mr-10 max-[600px]:mb-3"><Link className="w-[100px]" href={'/#'}>Uslovi korišćenja</Link></li>
                        <li className="text-xs text-gray-800 mr-10 max-[600px]:mb-3"><Link className="w-[100px]" href={'/#'}>O Agori</Link></li>
                        <li className="text-xs text-gray-400 mr-10 max-[600px]:mb-3"><Link className="w-[100px]" href={'/privacy-policy'}>Pravila privatnosti</Link></li>
                        <li className="text-xs text-gray-400 mr-10"><Link className="w-[100px]" href={'/kontakt'}>Kontaktirajte nas</Link></li>
                    </ul>
                    <ul className="h-full flex items-center w-40 justify-between max-[800px]:mb-5 max-[800px]:mt-2">
                        <li className=""><Link rel="noopener noreferrer" target="_blank" href={'https://www.instagram.com/agoraportal_/'}><Instagram size={18} /></Link></li>
                        <li className=""><Link rel="noopener noreferrer" target="_blank" href={'https://www.youtube.com/@Agora-Portal'}><Youtube size={20} /></Link></li>
                        <li className=""><Link rel="noopener noreferrer" target="_blank" href={'https://twitter.com/agoraportal_'}><FaXTwitter /></Link></li>
                        <li className="">
                            <Link rel="noopener noreferrer" target="_blank" className="w-[10px]" href={'https://www.tiktok.com/@agoraportal_'}>
                                <BsTiktok />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-0">
                    <p className="text-xs text-gray-400 mb-3 font-bold">Copyright © 2023 Agora</p>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Footer   
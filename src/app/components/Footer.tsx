import { Instagram, Twitter, X, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BsTiktok } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
// import Tiktok from '../../../public/icons8-tiktok.svg'

const Footer = () => {
  return (
    <div className="h-60 w-full bg-background mt-10">
        <div className='container flex flex-col h-full w-full'>
            <div>
                <h1 className="mt-5 font-bold">Istraži Agoru</h1>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="grid flex-1 border-b-[1px] border-background border-solid w-full"></div>
                <div className="flex mb-5">
                    <ul className="flex-1 h-full items-center flex">
                        <li className="text-xs text-gray-400 mr-10"><Link className="w-[100px]" href={'/'}>Uslovi korišćenja</Link></li>
                        <li className="text-xs text-gray-400 mr-10"><Link className="w-[100px]" href={'/'}>O Agori</Link></li>
                        <li className="text-xs text-gray-400 mr-10"><Link className="w-[100px]" href={'/'}>Pravila privatnosti</Link></li>
                        <li className="text-xs text-gray-400 mr-10"><Link className="w-[100px]" href={'/'}>Kontaktirajte nas</Link></li>
                    </ul>
                    <ul className="h-full flex items-center w-40 justify-between">
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
                <div className="">
                    <p className="text-xs text-gray-400 mb-2 font-bold">Copyright © 2023 Agora</p>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Footer   
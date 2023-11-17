import Link from 'next/link';
import NavLink from './NavLink';
import NavBtn from './NavBtn';
import Image from 'next/image';
import Logo from '../../../../public/LogoTip-01.png'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/libs/authOptions';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { Search } from 'lucide-react'
import { Input } from '../ui/input';
import HamburgerMenu from '../HamburgerMenu';

export type NavLink = {
    name: string;
    route: string;
}

export const links: NavLink[] = [
    {
        name: 'Novosti',
        route: '/category/Novosti'
    },
    {
        name: 'Politika',
        route: '/category/Politika'
    },
    {
        name: 'Sport',
        route: '/category/Sport'
    },
    {
        name: 'Kultura',
        route: '/category/Kultura'
    },
    {
        name: 'Društvo',
        route: '/category/Drustvo'
    },
]

const Nav = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className='h-20 bg-black fixed w-full border-b-[1px] border-secondary z-[1000] border-solid'>
            <div className="container flex w-full h-full items-center">
                <div className='bg-background mr-2 min-[820px]:hidden'>
                    <HamburgerMenu />
                </div>
                <Link href={'/search'} className='ml-1 h-10 rounded-sm flex items-center cursor-pointer min-[820px]:hidden max-[420px]:mr-2'>
                        <Search height={20} />
                </Link>
                <div className='min-[1000px]:mr-10 flex items-center max-[820px]:flex-1 max-[820px]:justify-center'>
                    <Link href={'/'} className='flex h-full items-center'>
                        <Image src={Logo} alt='logo' height={35} />
                        <p className='text-sm font-bold ml-1 max-[480px]:hidden'>Agora</p>
                    </Link>
                    <div className='h-6 bg-background right-0 ml-5 max-[820px]:hidden' style={{width: '1px'}}></div>
                </div>
                <div className='flex-1 max-[820px]:hidden'>
                    <ul className='flex justify-between min-[1000px]:mr-20 max-[1000px]:mr-2'>
                        {
                            links.map(link => <NavLink key={link.route} link={link} />)
                        }
                    </ul>
                </div>
                {/* <DarkModeToggle /> */}
                <div className='h-full flex items-center max-[1000px]:hidden'>
                    <Link href={'/search'} className='h-10 bg-secondary w-44 rounded-sm flex items-center cursor-pointer'>
                        <Search height={14} className='ml-2' />
                        <p className='text-xs ml-2'>Pretražuj..</p>
                    </Link>
                </div>
                <Link href={'/search'} className='h-10 rounded-sm flex items-center cursor-pointer max-[820px]:hidden min-[1000px]:hidden'>
                        <Search height={18} />
                </Link>
                <div className='max-[820px]:right-[0px]'>
                    <NavBtn />
                </div>
            </div> 
            {/* <div className='container flex' id='nav-container'>
                <div id='logo-wrapp'>
                    <Link href={'/'} style={{ display: 'flex', alignItems: 'center', maxWidth: '150px'}}>
                        <Image src={Logo} alt='logo' height={50} width={50} />
                        <p style={{ marginLeft: '10px' }}>Agora</p>
                    </Link>
                </div>
                <NavBtn />
                <div id="links-wrapp">
                    <ul>
                        {
                            links.map(link => <NavLink key={link.route} link={link} />)
                        }
                    </ul>
                </div>
                { 
                    session?.user.role === "admin" ? <Link href={'/admin'}>Admin</Link> : <></>
                }
                <DarkModeToggle />
            </div> */}
        </nav>
  )
}


export default Nav
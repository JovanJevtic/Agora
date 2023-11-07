import Link from 'next/link';
import NavLink from './NavLink';
import NavBtn from './NavBtn';
import Image from 'next/image';
import Logo from '../../../../public/LogoTip-01.png'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { Search } from 'lucide-react'
import { Input } from '../ui/input';

export type NavLink = {
    name: string;
    route: string;
}

const Nav = async () => {
    const session = await getServerSession(authOptions);

    const links: NavLink[] = [
        {
            name: 'Pocetna',
            route: '/'
        },
        {
            name: 'Novosti',
            route: '/novosti'
        },
        {
            name: 'Sport',
            route: '/sport'
        },
        {
            name: 'Kultura',
            route: '/kultura'
        },
        {
            name: 'Drustvo',
            route: '/drustvo'
        },
        {
            name: 'O nama',
            route: '/about'
        }
    ]

    return (
        <nav className='h-20 bg-black fixed w-full border-b-[0.1px] border-background'>
            <div className="container flex w-full h-full items-center">
                <div className='mr-10 flex items-center'>
                    <Link href={'/'} className='flex h-full items-center'>
                        <Image src={Logo} alt='logo' height={35} />
                        <p className='text-sm font-bold ml-1'>Agora</p>
                    </Link>
                    <div className='h-6 bg-background right-0 ml-5' style={{width: '1px'}}></div>
                </div>
                <div className='flex-1'>
                    <ul className='flex justify-between mr-10'>
                        {
                            links.map(link => <NavLink key={link.route} link={link} />)
                        }
                    </ul>
                </div>
                <DarkModeToggle />
                <div className='h-full flex items-center'>
                    <Link href={'/search'} className='h-10 bg-secondary w-44 rounded-sm flex items-center cursor-pointer'>
                        <Search height={14} className='ml-2' />
                        <p className='text-xs ml-2'>Pretrazuj..</p>
                    </Link>
                </div>
                <NavBtn />
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
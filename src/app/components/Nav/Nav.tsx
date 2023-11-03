import Link from 'next/link';
import NavLink from './NavLink';
import NavBtn from './NavBtn';
import Image from 'next/image';
import Logo from '../../../../public/LogoTip-01.png'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

export type NavLink = {
    name: string;
    route: string;
}

const Nav = async () => {
    const session = await getServerSession(authOptions);

    const links: NavLink[] = [
        {
            name: 'Login',
            route: '/login'
        },
        {
            name: 'Register',
            route: '/register'
        },
        {
            name: 'Profil',
            route: '/profile'
        }
    ]

    return (
        <nav>
            <div className='container' id='nav-container'>
                <div id='logo-wrapp'>
                    <Link href={'/'} style={{ display: 'flex', alignItems: 'center', maxWidth: '150px'}}>
                        <Image src={Logo} alt='logo' height={50} width={50} />
                        <p style={{ marginLeft: '10px' }}>Agora</p>
                    </Link>
                    <NavBtn />
                </div>
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
            </div>
        </nav>
  )
}

export default Nav
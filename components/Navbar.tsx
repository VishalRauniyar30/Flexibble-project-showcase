import Image from 'next/image'
import Link from 'next/link'

import { NavLinks } from '@/constants'
import { AuthProviders, Button, ProfileMenu } from '.'
import { getCurrentUser } from '@/lib/session'

const Navbar = async () => {
    const session = await getCurrentUser()
    
    return (
        <nav className='flex items-center justify-between py-5 px-8 border-b border-[#EBEAEA] gap-4'>
            <div className='flex-1 flex justify-start items-center gap-10'>
                <Link href='/'>
                    <Image 
                        src='/logo.svg'
                        width={116}
                        height={43}
                        alt='flexibble'
                        className='w-auto h-auto'
                    />
                </Link>
                <ul className='xl:flex hidden text-sm gap-7'>
                    {NavLinks.map((link) => (
                        <Link href={link.href} key={link.key}>
                            {link.text}
                        </Link>
                    ))}
                </ul>
            </div>
            <div className='flex justify-center items-center gap-4'>
                {session?.user ? (
                    <>
                        <ProfileMenu session={session} />
                        <Link href='/create-project'>
                            <Button title='Share Work' />
                        </Link>
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    )
}

export default Navbar
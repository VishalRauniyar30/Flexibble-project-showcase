'use client'

import { Fragment, useState } from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'

import { SessionInterface } from '@/utils'
import Button from './Button'

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className='flex justify-center items-center z-10 flex-col relative'>
            <Menu as='div'>
                <MenuButton className='flex justify-center items-center' onMouseEnter={() => setOpenModal(true)}>
                    {session?.user?.image && (
                        <Image 
                            src={session.user.image}
                            width={40}
                            height={40}
                            alt='user-profile'
                            className='rounded-full'
                        />
                    )}
                </MenuButton>
                <Transition
                    as={Fragment}
                    show={openModal}
                    enter='transition ease-out duration-200'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <MenuItems
                        static
                        className='flex items-center justify-start flex-col absolute right-1/2 translate-x-1/2 mt-3 p-7 sm:min-w-[300px] min-w-max rounded-xl bg-white border border-[#EBEAEA] custom-menu-shadow'
                        onMouseLeave={() => setOpenModal(false)}
                    >
                        <div className='flex flex-col items-center gap-y-4'>
                            {session?.user?.image && (
                                <Image 
                                    src={session?.user?.image}
                                    width={80}
                                    height={80}
                                    className='rounded-full'
                                    alt='user-profile'
                                />
                            )}
                            <p className='font-semibold'>{session?.user?.name}</p>
                        </div>
                        <div className='flex flex-col gap-3 pt-10 items-start w-full'>
                            <MenuItem>
                                <Link href={`/profile/${session?.user?.id}`} className='text-sm'>
                                    Work Preferences
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href={`/profile/${session?.user?.id}`} className='text-sm'>
                                    Settings
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href={`/profile/${session?.user?.id}`} className='text-sm'>
                                    Profile
                                </Link>
                            </MenuItem>
                        </div>
                        <div className='w-full flex items-center justify-center border-t border-[#EBEAEA] mt-5 pt-5'>
                            <MenuItem>
                                <Button title='Sign Out' handleClick={() => signOut()} fullWidth bgColor='bg-red-500' />
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}

export default ProfileMenu
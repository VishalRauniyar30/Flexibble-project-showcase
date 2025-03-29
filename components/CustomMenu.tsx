'use client'

import { Fragment } from "react"
import Image from "next/image"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"

type CustomMenuProps = {
    title: string;
    state: string;
    filters: Array<string>;
    setState: (value: string) => void;
}


const CustomMenu = ({ filters, setState, state, title }: CustomMenuProps) => {
    return (
        <div className="flex justify-start items-center flex-col w-full gap-7 relative">
            <label htmlFor={title} className="w-full text-[#3d3d4e]">
                {title}
            </label>
            <Menu as='div' className='self-start relative'>
                <div>
                    <MenuButton className='flex justify-center items-center gap-4 w-full rounded-md bg-[#F1F4F5] p-4 text-base outline-none capitalize'>
                        {state || 'Select a Category'}
                        <Image 
                            src='/arrow-down.svg'
                            width={10}
                            height={5}
                            alt="arrow-down"
                        />
                    </MenuButton>
                </div>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <MenuItems className='flex justify-start items-center flex-col absolute left-0 mt-2 sm:max-w-[300px] w-fit max-h-64 origin-top-right rounded-xl bg-white border border-[#EBEAEA] custom-menu-shadow overflow-y-auto'>
                        {filters.map((tag) => (
                            <MenuItem key={tag}>
                                <button
                                    type="button"
                                    value={tag}
                                    className="text-left w-full px-5 py-2 text-sm hover:bg-[#F1F4F5] self-start whitespace-nowrap capitalize"
                                    onClick={(e) => setState(e.currentTarget.value)}
                                >
                                    {tag}
                                </button>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}

export default CustomMenu
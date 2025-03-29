'use client'

import { MouseEvent, ReactNode, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Modal ({ children }: { children: ReactNode }) {
    const overlay = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)

    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.push('/')
    }, [router])

    const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if((e.target === overlay.current) && onDismiss){
            onDismiss()
        }
    }, [onDismiss, overlay])

    return (
        <div 
            ref={overlay} 
            onClick={(e) => handleClick(e)}
            className='fixed z-10 left-0 top-0 right-0 bottom-0 mx-auto bg-black/80'
        >
            <button type='button' onClick={onDismiss} className='absolute top-4 right-8 cursor-pointer'>
                <Image 
                    src='/close.svg'
                    width={17}
                    height={17}
                    alt='close'
                />
            </button>
            <div ref={wrapper} className='flex justify-start items-center flex-col absolute h-[95%] w-full bottom-0 bg-white rounded-t-xl lg:px-40 px-8 pt-14 pb-72 overflow-auto'>
                {children}
            </div>
        </div>
    )
}
import { MouseEventHandler } from 'react'
import Image from 'next/image'

type ButtonProps = {
    title: string;
    leftIcon?: string | null;
    rightIcon?: string | null;
    handleClick?: MouseEventHandler;
    submitting?: boolean | false;
    type?: 'button' | 'submit';
    bgColor?: string;
    textColor?: string;
    fullWidth?: boolean | false;
    width?: string | '';
}

const Button = ({ 
    title, leftIcon, width, fullWidth, rightIcon, 
    handleClick, submitting, textColor, type, bgColor 
}: ButtonProps) => {
    return (
        <button
            type={type || 'button'}
            disabled={submitting || false}
            onClick={handleClick}
            style={{ width: fullWidth ? '100%' : width || 'auto' }}
            className={
                `flex items-center justify-center gap-3 px-4 py-3 
                ${textColor || 'text-white'} ${submitting ? 'bg-black/50' :  bgColor || 'bg-[#9747FF]'}
                 rounded-xl text-sm font-medium max-md:w-full cursor-pointer hover:scale-105 transition-transform duration-300 ease-out`
            }
        >
            {leftIcon && <Image src={leftIcon} width={14} height={14} alt='left-icon' />}
            {title}
            {rightIcon && <Image src={rightIcon} width={14} height={14} alt='right-icon' />}
        </button>
    )
}

export default Button
'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import millify from "millify"

type ProjectCardProps = {
    id: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
}

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: ProjectCardProps) => {
    const min = 10000
    const maxViews = 10000000
    const maxLikes = 1000000
    const [randomLikes, setRandomLikes] = useState(0)
    const [randomViews, setRandomViews] = useState(0)
    
    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * (maxLikes - min + 1) + min))
        setRandomViews(Math.floor(Math.random() * (maxViews - min + 1) + min))
    }, [])

    return (
        <div className="flex items-center justify-center flex-col rounded-2xl drop-shadow-xl transition-transform duration-500 ease-in-out hover:-translate-y-2">
            <Link href={`/project/${id}`} className="flex items-center justify-center group relative w-full h-full">
                <Image 
                    src={image}
                    width={414}
                    height={310}
                    className="w-full h-full object-cover rounded-2xl"
                    alt="project-image"
                />
                <div className="hidden group-hover:flex justify-end items-end w-full h-1/3 bg-gradient-to-b from-transparent to-black/50 rounded-b-2xl gap-2 absolute bottom-0 right-0 font-semibold text-lg text-white p-4">
                    <p className="w-full">{title}</p>
                </div>
            </Link>
            <div className="flex items-center justify-between w-full px-2 mt-3 font-semibold text-sm">
                <Link href={`/profile/${userId}`}>
                    <div className="flex items-center justify-center gap-2">
                        <Image 
                            src={avatarUrl}
                            width={24}
                            height={24}
                            alt="profile-image"
                            className="rounded-full"
                        />
                        <p>{name}</p>
                    </div>
                </Link>
                <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center justify-center gap-2">
                        <Image src='/hearth.svg' width={13} height={12} alt="heart" />
                        <p className="text-sm">{millify(randomLikes)}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Image src='/eye.svg' width={12} height={9} alt="eye" />
                        <p className="text-sm">{millify(randomViews)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
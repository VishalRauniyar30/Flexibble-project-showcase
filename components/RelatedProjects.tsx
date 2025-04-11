'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { getUserProjects } from "@/lib/actions"
import { ProjectInterface, UserProfile } from "@/utils"

type RelatedProjectsProps = {
    userId: string | undefined
    projectId: string | undefined
}

const RelatedProjects = ({ projectId, userId }: RelatedProjectsProps) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchUserProjects = async() => {
            if(!userId) return
            setLoading(true)
            setError(false)
            try {
                const result: UserProfile | null = await getUserProjects(userId)
                if(!result || !result?.projects) {
                    setError(true)
                } else {
                    setUserProfile(result)
                }
            } catch (error) {
                console.error("Error fetching project details:", error)
                setError(true)
            } finally{
                setLoading(false)
            }
        }
        fetchUserProjects()
    }, [userId])
    if (loading) {
        return <h1 className="w-full text-3xl text-center my-10 px-2">Loading...</h1>
    }
    
    if (error) {
        return <h1 className="w-full text-3xl text-center my-10 px-2">Failed To Fetch Project Information</h1>
    }
    const filteredProjects = userProfile?.projects?.edges
        ?.filter(({ node }: { node: ProjectInterface }) => node?._id !== projectId)
        .map(({ node }: { node: ProjectInterface }) => node) || []
    
    return (
        <section className="flex flex-col mt-32 w-full">
            <div className="flex justify-between items-center">
                <p className="text-base font-bold">
                    More By {userProfile?.name}
                </p>
                <Link href={`/profile/${userProfile?._id}`} className="text-[#9747FF] text-base">
                    View All
                </Link>
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-5">
                {filteredProjects?.map((project: ProjectInterface) => (
                    <div className="flex items-center justify-center drop-shadow-2xl flex-col rounded-2xl min-w-[210px] min-h-[197px]" key={project._id}>
                        <Link href={`/project/${project?._id}`} className="flex items-center justify-center group relative w-full h-full">
                            <Image 
                                src={project?.image}
                                width={414}
                                height={314}
                                alt="project image"
                                className="w-full h-full object-contain rounded-2xl"
                            />
                            <div className="hidden group-hover:flex justify-end items-end w-full h-1/3 bg-gradient-to-b from-transparent to-black/50 rounded-b-2xl gap-2 absolute bottom-0 right-0 font-semibold text-lg text-white p-4">
                                <p className="w-full">{project?.title}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RelatedProjects
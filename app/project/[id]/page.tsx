'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

import { Modal, ProjectActions, RelatedProjects } from "@/components"
import { getProjectDetails } from "@/lib/actions"
import { ProjectInterface } from "@/utils"

const Project = () => {
    const params = useParams()
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    
    const [projectDetails, setProjectDetails] = useState<ProjectInterface | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const { data: session } = useSession()
    
    useEffect(() => {
        if(!id) {
            return
        }
        const fetchProjectDetails = async () => {
            setLoading(true)
            try {
                const result = await getProjectDetails(id) as ProjectInterface
                if(!result) {
                    setError(true)
                } else {
                    setProjectDetails(result)
                }
            } catch (error) {
                console.error("Error fetching project details:", error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchProjectDetails()
    }, [id])

    if (loading) {
        return <h1 className="w-full text-3xl text-center my-10 px-2">Loading...</h1>
    }

    if (error) {
        return <h1 className="w-full text-3xl text-center my-10 px-2">Failed To Fetch Project Information</h1>
    }
    
    return (
        <Modal>
            <section className="flex justify-between items-center gap-y-8 xl:max-w-5xl max-w-4xl max-sm:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-sm:flex-col">
                    <Link href={`/profile/${projectDetails?.createdBy?._id}`}>
                        {projectDetails?.createdBy?.avatarUrl && (
                            <Image 
                                src={projectDetails?.createdBy?.avatarUrl}
                                width={50}
                                height={50}
                                alt="profile"
                                className="rounded-full"
                            />
                        )}
                    </Link>
                    <div className="flex-1 flex items-center justify-start flex-col gap-1">
                        <p className="self-start text-lg font-semibold">
                            {projectDetails?.title}
                        </p>
                        <div className="flex flex-wrap whitespace-nowrap text-sm font-normal gap-2 w-full">
                            <Link href={`/profile/${projectDetails?.createdBy?._id}`}>
                                {projectDetails?.createdBy?.name}
                            </Link>
                            <Image src='/dot.svg' width={4} height={4} alt="dot" />
                            <Link href={`/?category=${projectDetails?.category}`} className="font-semibold text-[#9747FF]">
                                {projectDetails?.category}
                            </Link>
                        </div>
                    </div>
                </div>
                {session?.user?.email === projectDetails?.createdBy?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectId={projectDetails?._id} />
                    </div>
                )}
            </section>
            <section className="mt-14">
                {projectDetails?.image && (
                    <Image 
                        src={projectDetails.image}
                        width={1064}
                        height={798}
                        alt="poster"
                        className="object-cover rounded-2xl"
                    />
                )}
            </section>
            <section className="flex items-center justify-center flex-col mt-20">
                <p className="max-w-5xl text-xl font-normal">
                    {projectDetails?.description}
                </p>
                <div className="flex flex-wrap mt-5 gap-5">
                    <Link 
                        href={projectDetails?.githubUrl || 'https://github.com//VishalRauniyar30'} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 text-sm font-medium text-[#9747FF]"
                    >
                        🖥 <span className="underline">Github</span>
                    </Link>
                    <Image src='/dot.svg' width={4} height={4} alt="dot" />
                    <Link 
                        href={projectDetails?.liveSiteUrl || 'https://netlify.com'} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 text-sm font-medium text-[#9747FF]"
                    >
                        🚀 <span className="underline">Live Site</span>
                    </Link>
                </div>
            </section>
            <section className="flex items-center justify-center w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-[#d7d7d7]" />
                <Link href={`/profile/${projectDetails?.createdBy?._id}`} className="min-w-[82px] h-[82px]">
                    {projectDetails?.createdBy?.avatarUrl && (
                        <Image 
                            src={projectDetails.createdBy.avatarUrl}
                            width={82}
                            height={82}
                            alt="profile"
                            className="rounded-full"
                        />
                    )}
                </Link>
                <span className="w-full h-0.5 bg-[#d7d7d7]" />
            </section>
            <RelatedProjects userId={projectDetails?.createdBy?._id} projectId={projectDetails?._id} />
        </Modal>
    )
}

export default Project
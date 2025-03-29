'use client'

import { deleteProject } from "@/lib/actions"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type ProjectActionsProps = {
    projectId: string | undefined
}

const ProjectActions = ({ projectId }: ProjectActionsProps) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const router = useRouter()

    const handleDeleteProject = async () => {
        setIsDeleting(true)

        try {
            await deleteProject(projectId)
            router.push('/')
        } catch (error) {
            console.error(error)
        } finally{
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Link href={`/edit-project/${projectId}`} className="flex items-center justify-center p-3 text-[#3d3d4e] bg-[#E2E5F1] rounded-lg text-sm font-medium">
                <Image src='/pencile.svg' width={15} height={15} alt="edit" />
            </Link>
            <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteProject}
                className={`flex items-center justify-center p-3 text-[#3d3d4e] hover:bg-red-600 rounded-lg text-sm font-medium ${isDeleting ? 'bg-[#4D4A4A]' : 'bg-[#9747FF]'} cursor-pointer`}
            >
                <Image src='/trash.svg' width={15} height={15} alt="delete" />
            </button>  
        </>
    )
}

export default ProjectActions
import { redirect } from 'next/navigation'

import { Modal, ProjectForm } from '@/components'
import { getProjectDetails } from '@/lib/actions'
import { getCurrentUser } from '@/lib/session'

const EditProject = async({ params } : { params: Promise<{id: string}> }) => {
    const resParams = await params
    const session = await getCurrentUser()
    
    if(!session?.user) {
        redirect('/')
    }

    const result = await getProjectDetails(resParams.id as string)

    if(!result) {
        return (
            <p>Failed To Fetch Project Info</p>
        )
    }
    
    return (
        <Modal>
            <h3 className='md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full'>
                Edit Project
            </h3>
            <ProjectForm type='edit' session={session} project={result} />
        </Modal>
    )
}

export default EditProject
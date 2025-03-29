'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { createNewProject, updateNewProject } from '@/lib/actions'
import { FormState, ProjectInterface, SessionInterface } from '@/utils'
import { Button, CustomMenu, FormField } from '.'
import { categoryFilters } from '@/constants'

type ProjectFormProps = {
    type: string
    session: SessionInterface
    project?: ProjectInterface
}

const ProjectForm = ({ type, session, project }: ProjectFormProps) => {
    
    const router = useRouter()
    const [submitting, setSubmitting] = useState<boolean>(false)

    const [form, setForm] = useState<FormState>({
        title: project?.title || '',
        description: project?.description || '',
        image: project?.image || '',
        liveSiteUrl: project?.liveSiteUrl || '',
        githubUrl: project?.githubUrl || '',
        category: project?.category || '', 
    })

    const handleStateChange = (fieldName: keyof FormState, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }))
    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const file = e.target.files?.[0]

        if(!file) {
            return
        }
        if(!file.type.includes('image')){
            return alert('Please Upload an Image!')
        }
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            const result = reader.result as string

            handleStateChange('image', result)
        }
    }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            if(type === 'create') {
                await createNewProject(form, session?.user?._id)
                router.push('/')
            }
            if(type === 'edit') {
                await updateNewProject(form, project?._id as string)
                router.push('/')
            }
        } catch (error) {
            alert(`Failed to ${type === 'create' ? 'create' : 'edit'} the project. Try Again!`)
        } finally {
            setSubmitting(false)
        }
    }
    
    return (
        <form onSubmit={handleFormSubmit} className='flex justify-start items-center flex-col w-full lg:pt-16 pt-12 gap-10 text-lg max-w-5xl mx-auto'>
            <div className='flex items-center justify-start w-full lg:min-h-[400px] min-h-[200px] relative'>
                <label htmlFor="poster" className='flex items-center justify-center z-10 text-center w-full h-full p-20 text-[#3d3d4e] border-2 border-[#D9D9D9] border-dashed'>
                    {!form?.image && 'Choose a poster for your project'}
                </label>
                <input 
                    type="file" 
                    id='image'
                    accept='image/*'
                    required={type === 'create' ? true : false}
                    onChange={(e) => handleChangeImage(e)} 
                    className='absolute z-30 w-full opacity-0 h-full cursor-pointer'   
                />
                {form?.image && (
                    <Image 
                        src={form?.image}
                        fill
                        alt='project poster'
                        className='sm:p-10 object-contain z-20'
                    />
                )}
            </div>
            <FormField
                title='Title'
                state={form.title}
                placeholder='Flexibble'
                setState={(value) => handleStateChange('title', value)}
            />
            <FormField
                title='Description'
                state={form.description}
                placeholder='Showcase and discover remarkable developer projects.'
                isTextArea
                setState={(value) => handleStateChange('description', value)}
            />
            <FormField
                title='Website URL'
                type='url'
                state={form.liveSiteUrl}
                placeholder='https://niketRauniyar.org'
                setState={(value) => handleStateChange('liveSiteUrl', value)}
            />
            <FormField
                type='url'
                title='Github URL'
                state={form.githubUrl}
                placeholder='https://github.com/vishalRauniyar30'
                setState={(value) => handleStateChange('githubUrl', value)}
            />
            <CustomMenu
                title='Category'
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />
            <div className='flex justify-start items-center w-full'>
                <Button 
                    title={submitting ? `${type === 'create' ? 'Creating...' : 'Editing...'}` : `${type === 'create' ? 'Create' : 'Edit'}`}
                    type='submit'
                    leftIcon={submitting ? '' : '/plus.svg'}
                    submitting={submitting}
                    width='197px'
                />
            </div>
        </form>
    )
}

export default ProjectForm
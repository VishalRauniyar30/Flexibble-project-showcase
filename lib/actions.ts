import { createClient } from "@sanity/client"
import imageUrlBuilder from '@sanity/image-url'

import { ProjectForm, ProjectInterface } from "@/utils"
import { NEXT_SANITY_CLIENT_ID, NEXT_SANITY_TOKEN } from "@/temp"

export const client = createClient({
    projectId: NEXT_SANITY_CLIENT_ID,
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: false,
    token: NEXT_SANITY_TOKEN,
})

const serverSite = 'http://localhost:3000'



const builder = imageUrlBuilder(client)

export const urlFor = (src : any) => builder.image(src)

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverSite}/api/auth/token`)
        return response.json()
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getUser = async(email : string) => {
    try {
        const query = `*[_type == "user" && email == $email] {
            _id,
            name,
            email,
            avatarUrl,
            description,
            githubUrl,
            linkedinUrl,
        }[0]`
        const user = await client.fetch(query, { email })
        if(user) {
            return {
                user: {
                    id: user._id,
                    ...user
                }
            }
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllUsers = async () => {
    try {
        const query = `*[_type == "user"]`
        return await client.fetch(query)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createUser = async(name: string, email: string, avatarUrl: string) => {
    try {
        const newUser = {
            _type: 'user',
            name,
            email,
            avatarUrl
        }
        return await client.create(newUser)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverSite}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({
                path: imagePath
            })
        })
        return response.json()
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createNewProject = async (form: ProjectForm, creatorId: string) => {
    try {
        const imageUrl = await uploadImage(form.image)
    
        if(imageUrl.url) {
            const categoryQuery = `*[_type == "category" && title == "${form.category}"][0]{ _id }`
            const categoryData = await client.fetch(categoryQuery)

            if(!categoryData) {
                throw new Error("invalid category selected")
            }
            const newProject = {
                _type: 'project',
                title: form.title,
                description: form.description,
                image: imageUrl.url,
                liveSiteUrl: form.liveSiteUrl,
                githubUrl: form.githubUrl,
                category: {
                    _type: "reference",
                    _ref: categoryData._id,
                },
                createdBy: {
                    _type: "reference",
                    _ref: creatorId,
                },
            }
    
            return await client.create(newProject)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateNewProject = async (form: ProjectForm, projectId: string) => {
    try {
        let imageUrl = form.image
        if(typeof form.image !== 'string'){
            const uploadedImage = await uploadImage(form.image)
            imageUrl = uploadedImage?.url || form.image
        }
        const categoryQuery = `*[_type == "category" && title == "${form.category}"][0]{ _id }`
        const categoryData = await client.fetch(categoryQuery)
        if(!categoryData) {
            throw new Error("Invalid category selected")
        }

        const updatedProject = {
            title: form.title,
            image: imageUrl,
            liveSiteUrl: form.liveSiteUrl,
            githubUrl: form.githubUrl,
            category: {
                _type: "reference",
                _ref: categoryData._id,
            },
        }
        return await client.patch(projectId).set(updatedProject).commit()
    } catch (error) {
        console.error("Error updating project:", error)
        throw error
    }
}


export const fetchAllProjects = async (category?: string | null, endcursor?: string | null) => {
    try {
        // Fetch only the required projects based on pagination
        const query = `*[_type == "project"
        ${category ? ` && category._ref in *[_type == "category" && title == "${category}"]._id` : ""}
        ${endcursor ? ` && _createdAt < "${endcursor}"` : ""}
        ] | order(_createdAt desc)[0...9] {  // Fetch 9 to check if there's a next page
            _id,
            title,
            description,
            "category": category->title,
            image,
            githubUrl,
            liveSiteUrl,
            _createdAt,
            "createdBy": createdBy->{
                _id,
                name,
                email,
                avatarUrl
            }
        }`

        const projects = await client.fetch(query)

        const hasNextPage = projects.length === 9// If 9 projects are fetched, there is another page

        // Slice to return only 8 projects (but check for next page with the 9th)
        const projectsToReturn = projects.slice(0, 8)

        return {
            projectSearch: {
                edges: projectsToReturn.map((project: ProjectInterface) => ({ node: project })),
                pageInfo: {
                    hasPreviousPage: !!endcursor,  // True if there's a previous page
                    hasNextPage,
                    startCursor: projectsToReturn.length > 0 ? projectsToReturn[0]._createdAt : '',
                    endCursor: hasNextPage ? projects[7]._createdAt : '' // Use 9th project's date as cursor
                }
            }
        }
    } catch (error) {
        console.error("Error fetching projects:", error)
        throw error
    }
}



export const getProjectDetails = async(id: string) => {
    try {
        const query = `*[_type == "project" && _id == $id][0] {
            _id,
            title,
            description,
            "category": category->title,
            image,
            githubUrl,
            liveSiteUrl,
            "createdBy": createdBy->{
                _id,
                name,
                email,
                avatarUrl
            }
        }`  
        const params = { id }     
        return await client.fetch(query, params)
    } catch (error) {
        console.error("Error fetching project details:", error)
        throw new Error("Failed to fetch project details.")
    }
}

export const deleteProject = async (id: string | undefined) => {
    try {
        if(!id){
            throw new Error("Project ID is Required")
        }
        return await client.delete(id)
    } catch (error) {
        console.error("Error deleting project:", error)
        throw new Error("Failed to delete project.")
    }
}

export const getUserProjects = async (id: string | undefined, last: number = 100) => {
    try {
        const query = `*[_type == "user" && _id == "${id}"][0] {
            _id,
            name,
            email,
            description,
            avatarUrl,
            githubUrl,
            linkedinUrl,
            "projects": *[_type == "project" && references(^._id)] | order(_createdAt desc)[0...${last}] {
                _id,
                title,
                description,
                "category": category->title,
                image,
                githubUrl,
                liveSiteUrl,
            }
        }`
        const user = await client.fetch(query)
        if(!user) return null

        const edges = user.projects.map((project: ProjectInterface) => ({ node: project }))

        return {
            ...user,
            projects: {
                edges,
                pageInfo: {
                    hasPreviousPage: false,
                    hasNextPage: false,
                    startCursor: edges[0]?.node._createdAt || "",
                    endCursor: edges[edges.length - 1]?.node._createdAt || "",
                },
            }
        }
    } catch (error) {
        console.error("Error fetching projects:", error)
        throw error
    }
}

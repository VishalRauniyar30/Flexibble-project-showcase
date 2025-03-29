'use client'

import { ProfilePage } from "@/components"
import { getUserProjects } from "@/lib/actions"
import { UserProfile } from "@/utils"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const Profile = () => {
    const params = useParams()
    const id = Array.isArray(params.id) ? params.id[0] : params.id

    const [userProjects, setUserProjects] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        if(!id) {
            return
        }
        const fetchUserProjects = async () => {
            setLoading(true)
            try {
                const result = await getUserProjects(id, 100) as UserProfile
                if(!result) {
                    setError(true)
                } else {
                    setUserProjects(result)
                }
            } catch (error) {
                console.error("Error fetching project details:", error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchUserProjects()
    }, [id])

    if (loading) {
        return <h1 className="w-full text-3xl text-center my-10 px-2">Loading...</h1>
    }
    
    if (error) {
        return <h1 className="w-full text-3xl text-center my-10 px-2">Failed To Fetch Project Information</h1>
    }
    console.log(userProjects)
    return (
        <ProfilePage user={userProjects} />
    )
}

export default Profile
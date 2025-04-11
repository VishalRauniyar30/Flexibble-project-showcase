import { ProfilePage } from "@/components"
import { getUserProjects } from "@/lib/actions"
import { UserProfile } from "@/utils"

const Profile = async({ params }: { params: Promise<{ id: string }> }) => {
    const resParams = await params

    const result = await getUserProjects(resParams.id, 100) as UserProfile | null
    
    if (!result) {
        return <p>Failed to fetch user info</p>
    }

    // Destructuring the user and projects data
    const { name, email, description, avatarUrl, githubUrl, linkedinUrl, projects } = result

    return (
        <ProfilePage 
            user={result}
        />
    )
}

export default Profile
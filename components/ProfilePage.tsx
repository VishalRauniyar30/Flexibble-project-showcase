import { ProjectInterface, UserProfile } from "@/utils"
import Image from "next/image"
import { Button, ProjectCard } from "."
import Link from "next/link"



type ProfilePageProps = {
    user: UserProfile | null
}

const ProfilePage = ({ user }: ProfilePageProps) => {
    const maxsize = user?.projects?.edges?.length || 0
    const randomInd = Math.floor(Math.random() * maxsize)
    return (
        <section className="flex items-center justify-center flex-col max-w-[120rem] w-full mx-auto lg:px-20 py-6 px-5">
            <section className="flex items-center justify-between max-lg:flex-col gap-10 w-full">
                <div className="flex items-start flex-col w-full">
                    {user?.avatarUrl && (
                        <Image
                            src={user.avatarUrl}
                            width={100}
                            height={100}
                            alt="user-image"
                            className="rounded-full"
                        />
                    )}
                    <p className="text-4xl font-bold mt-10">
                        {user?.name}
                    </p>
                    <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg capitalize">
                        I am a full stack web developer and programmer 👋
                    </p>
                    <div className="flex flex-wrap mt-5 gap-5">
                        <Link 
                            href={user?.githubUrl || 'https://github.com//VishalRauniyar30'} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 text-sm font-medium text-[#9747FF]"
                        >
                            🖥 <span className="underline">Github</span>
                        </Link>
                        <Image src='/dot.svg' width={4} height={4} alt="dot" />
                        <Link 
                            href={user?.linkedinUrl || 'https://netlify.com'} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 text-sm font-medium text-[#9747FF]"
                        >
                            🚀 <span className="underline">LinkedIn</span>
                        </Link>
                    </div>
                    <div className="flex mt-8 gap-5 w-full flex-wrap">
                        <Button 
                            title="Follow"
                            leftIcon='/plus-round.svg'
                            bgColor="bg-[#E2E5F1] !w-max"
                            textColor="text-[#252525]"
                        />
                        <Link href={`mailto:${user?.email}`}>
                            <Button 
                                title="Hire Me"
                                leftIcon='/email.svg'
                            />
                        </Link>
                    </div>
                </div>
                {user?.projects?.edges ? (
                    <Image
                        src={user?.projects?.edges[randomInd]?.node?.image}
                        width={739}
                        height={554}
                        alt="project image"
                        className="rounded-xl object-contain"
                    />
                ) : (
                    <Image
                        src='/profile-post.png'
                        width={739}
                        height={554}
                        alt="project image"
                        className="rounded-xl"
                    />
                )}
            </section>
            <section className="flex items-center justify-start flex-col lg:mt-28 mt-16 w-full">
                <p className="w-full text-left text-lg font-semibold">
                    Recent Work
                </p>
                <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 my-5">
                    {user?.projects?.edges?.slice(0,8)?.map(({ node }: { node: ProjectInterface }) => (
                        <ProjectCard 
                            key={node?._id}
                            id={node?._id}
                            image={node?.image}
                            title={node?.title}
                            name={user?.name}
                            avatarUrl={user?.avatarUrl}
                            userId={user?._id}
                        />
                    ))}
                </div>
            </section>
        </section>
    )
}

export default ProfilePage
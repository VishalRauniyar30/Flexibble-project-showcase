import { Categories, LoadMore, ProjectCard } from "@/components"
import { fetchAllProjects } from "@/lib/actions"
import { ProjectInterface } from "@/utils"

type SearchParams = {
    category?: string | null;
    endcursor?: string | null;
}

type Props = {
    searchParams: SearchParams
}

type ProjectSearch = {
    projectSearch: {
        edges: { node: ProjectInterface }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        }
    }
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
    const data = await fetchAllProjects(category, endcursor) as ProjectSearch

    const projectsToDisplay = data?.projectSearch?.edges || []

    if(projectsToDisplay?.length === 0){
        return (
            <section className="flex justify-start items-center flex-col lg:px-20 py-6 px-5">
                <Categories />
                <p className="text-center w-full my-10 px-2">
                    No Projects Found, Go Create Some First
                </p>
            </section>
        )
    }
    
    return (
        <section className="flex justify-start items-center flex-col lg:px-20 py-6 px-5 mb-16">
            <Categories />
            <section className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10 w-full">
                {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
                    <ProjectCard 
                        key={node?._id}
                        id={node?._id}
                        image={node?.image}
                        title={node?.title}
                        name={node?.createdBy?.name}
                        avatarUrl={node?.createdBy?.avatarUrl}
                        userId={node?.createdBy?._id}
                    />
                ))}
            </section>
            <LoadMore
                startCursor={data?.projectSearch?.pageInfo?.startCursor}
                endCursor={data?.projectSearch?.pageInfo?.endCursor}
                hasNextPage={data?.projectSearch?.pageInfo?.hasNextPage}
                hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
            />
        </section>
    )
}

export default Home
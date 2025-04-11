'use client'

import { useRouter } from "next/navigation"

import Button from "./Button"

type LoadMoreProps = {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

const LoadMore = ({ startCursor, endCursor, hasNextPage, hasPreviousPage }: LoadMoreProps) => {
    const router = useRouter()

    const handleNavigation = (type: string) => {
        const currentParams = new URLSearchParams(window.location.search)

        if(type === 'prev' && hasPreviousPage){
            currentParams.delete('endcursor')
            currentParams.set('startcursor', startCursor)
        } else if(type === 'next' && hasNextPage){
            currentParams.delete('startcursor')
            currentParams.set('endcursor', endCursor)
        }

        const newSearchParams = currentParams.toString()
        const newPathName = `${window.location.pathname}?${newSearchParams}`

        router.push(newPathName)
    }

    if(!hasNextPage && !hasPreviousPage){
        return null
    }

    return (
        <div className="w-full flex items-center justify-center gap-5 mt-10">
            {hasPreviousPage && (
                <Button title="Previous Page" handleClick={() => handleNavigation('prev')} width="140px" />
            )}
            {hasNextPage && (
                <Button title="Next Shots" handleClick={() => handleNavigation('next')} width="140px" />
            )}
        </div>
    )
}

export default LoadMore
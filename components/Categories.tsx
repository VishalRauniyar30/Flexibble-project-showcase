'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { categoryFilters } from "@/constants"

const Categories = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const category = searchParams.get('category')

    const handleTags = (item: string) => {
        router.push(`${pathname}?category=${item}`)
    }
    
    return (
        <div className="flex justify-between items-center w-full gap-5 flex-wrap">
            <ul className="flex gap-2 overflow-auto">
                {categoryFilters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => handleTags(filter)}
                        className={`${category === filter ? "bg-[#F3F3F4] font-medium" : "font-normal"} px-4 py-3 rounded-lg capitalize whitespace-nowrap cursor-pointer`}
                    >
                        {filter}
                    </button>
                ))}
            </ul>
        </div>
    )
}

export default Categories
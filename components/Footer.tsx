import Image from "next/image"
import Link from "next/link"

import { footerLinks } from "@/constants"

type ColumnProps = {
    title: string;
    links: Array<string>;
}

const FooterColumn = ({ links, title }: ColumnProps) => (
    <div className="flex flex-1 flex-col gap-3 text-sm min-w-max">
        <h4 className="font-semibold">{title}</h4>
        <ul className="flex flex-col gap-2 font-normal">
            {links.map((link) => (
                <Link href='/' key={link}>
                    {link}
                </Link>
            ))}
        </ul>
    </div>
)

const Footer = () => {
    return (
        <section className="flex justify-start items-center flex-col w-full gap-20 lg:px-20 py-6 px-5 bg-[#FAFAFB]">
            <div className="flex flex-col gap-12 w-full">
                <div className="flex items-start flex-col">
                    <Image src='/logo-purple.svg' width={116} height={38} alt="flexibble" className="w-auto h-auto" />
                    <p className="text-start text-sm font-normal mt-5 max-w-xs">
                        Flexibble is the world&apos;s leading community for creatives to share,
                        grow, and get hired
                    </p>
                </div>
                <div className="flex flex-wrap gap-12">
                    <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />
                    <div className="flex flex-1 flex-col gap-4">
                        <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
                        <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
                    </div>
                    <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />
                    <div className="flex flex-1 flex-col gap-4">
                        <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
                        <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
                    </div>
                    <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links} />
                </div>
            </div>
            <div className="flex items-center justify-between max-sm:flex-col w-full text-sm min-w-max">
                <p>@2025 Flexibble. All Rights Reserved</p>
                <p className="text-[#4D4A4A]">
                    <span className="text-black font-semibold">10,214</span> Projects Submitted
                </p>
            </div>
        </section>
    )
}

export default Footer
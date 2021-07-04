import Head from 'next/head'
import styles from '../../styles/Blog.module.css'
import Image from 'next/image'

import { getBySlug } from "../../src/services/api.blog.service"

export default function Home({blog}) {
    return (
        <>
            <Head>
                <title>Pierre Gassin | {blog.title}</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <header className="w-100 mx-0 overflow-hidden">
                <div className={styles.blogPageHeader} style={{
                    backgroundImage: "url('"+blog.cover+"')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    {/* <Image layout='fill'
                        src={"https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg"}
                        objectFit='cover'
                        objectPosition='center center'
                    /> */}
                </div>
            </header>
            <main className="mx-5 px-5 mb-5 pb-5 container mx-0 overflow-hidden">
                <h1 className={`${styles.blogPageTitle}`}>{blog.title}</h1>
                <p className={`${styles.blogPagePara}`}>
                {blog.description}
                </p>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const slug = context.query.slug
    const result = await getBySlug(slug)
    return {
        props: {
            blog: result.data
        }, // will be passed to the page component as props
    }
}
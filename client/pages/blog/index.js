import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import styles from '../../styles/Blog.module.css'

import { getBlogs } from "../../src/services/api.blog.service"

export default function Home({blogs}) {
    return (
        <>
            <Head>
                <title>Pierre Gassin | Blog</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <main className="row w-100 overflow-hidden mx-0">
                <div className="col-xs-12 col-md-4 px-0">
                    <div className="left-panel">
                        <div className="py-5">
                            <h1 className="left-title">Blog</h1>
                        </div>
                    </div>
                </div>
                <div className="col mt-5 row justify-content-around align-items-stretch pr-0 overflow-hidden">
                    {
                        blogs.map((e, i) =>
                            <Link href={`/blog/${e.slug}`} key={i}>
                                <div className={`mb-3 px-0 ${styles.blogItem}`}>
                                    {e.cover && <Image height={"120"} width="auto" src={e.cover} alt={e.alt} className={styles.image} objectFit="cover" objectPosition="50% 50%" />}
                                    <h2>{e.title}</h2>
                                    <p>
                                        {e.description}
                                    </p>
                                    <div className={styles.blur}>

                                    </div>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </main>
        </>
    )
}


export async function getServerSideProps(context) {
    const result = await getBlogs()
    console.log(result)
    return {
        props: {
            blogs: result.success ? result.data : []
        }, // will be passed to the page component as props
    }
}
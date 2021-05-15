import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import styles from '../../styles/Blog.module.css'

export default function Home() {
    const reportages = [
        {
            src: "https://images.pexels.com/photos/4626371/pexels-photo-4626371.jpeg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://images.pexels.com/photos/3457273/pexels-photo-3457273.jpeg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://images.pexels.com/photos/2228561/pexels-photo-2228561.jpeg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://images.pexels.com/photos/4626371/pexels-photo-4626371.jpeg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://images.pexels.com/photos/3120864/pexels-photo-3120864.jpeg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://images.pexels.com/photos/2228560/pexels-photo-2228560.jpeg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://images.pexels.com/photos/4132936/pexels-photo-4132936.png",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
    ]


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
                        reportages.map((e, i) =>
                            <Link href={`/blog/${e.title.toLocaleLowerCase().split(" ").join('-')}`} key={i}>
                                <div className={`mb-3 px-0 ${styles.blogItem}`}>
                                    <Image height={"120"} width="auto" src={e.src} alt={e.alt} className={styles.image} objectFit="cover" objectPosition="50% 50%" />
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

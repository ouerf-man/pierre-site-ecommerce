import Head from 'next/head'
import styles from '../../styles/Blog.module.css'
import Image from 'next/image'

export default function Home() {
    return (
        <>
            <Head>
                <title>Pierre Gassin | Korba Passementerie</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <header className="w-100 mx-0 overflow-hidden">
                <div className={styles.blogPageHeader} style={{
                    backgroundImage: "url('https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg')",
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
                <h1 className={`${styles.blogPageTitle}`}>Pierre Gassin | Korba Passementerie</h1>
                <p className={`${styles.blogPagePara}`}>
                Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
                <p className={`${styles.blogPagePara}`}>
                Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
                <p className={`${styles.blogPagePara}`}>
                Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
            </main>
        </>
    )
}

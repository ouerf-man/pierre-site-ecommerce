import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import styles from '../../styles/Reportage.module.css'

export default function Home() {
    const reportages = [
        {
            src: "https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
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
                <title>Pierre Gassin | Reportages</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <main className="row w-100 flex-column flex-md-row  overflow-hidden mx-0">
                <div className="col-xs-12 col-md-4 px-0 left-panel-parent">
                    <div className="left-panel">
                        <div className="py-5">
                            <h1 className="left-title">Reportages</h1>
                        </div>
                    </div>
                </div>
                <div className="col col-xs-12 row justify-content-around align-items-stretch pr-0 overflow-hidden">
                    {
                        reportages.map((e, i) =>
                            <Link href={`/reportages/${e.title.toLocaleLowerCase().split(" ").join('-')}`} key={i}>
                                <div className={`col-xs-5 col-md-4 px-0 ${styles.reportageItem} h-auto`}>
                                    <Image src={e.src} alt={e.alt} layout="fill" objectFit="cover"/>
                                    <div className={`${styles.overlay}`}>
                                        <h2>
                                            {e.title}
                                        </h2>
                                        <hr />
                                        <p>
                                            {e.description}
                                        </p>
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

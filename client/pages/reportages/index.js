import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import styles from '../../styles/Reportage.module.css'

export default function Home() {
    const reportages = [
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/07/Korba-Passementerie-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tabarka-Fort-Génois-et-Aiguilles-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/07/Korba-Passementerie-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tabarka-Fort-Génois-et-Aiguilles-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/07/Korba-Passementerie-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tabarka-Fort-Génois-et-Aiguilles-scaled.jpg",
            alt: 'Korba passmenterie',
            title: "First slide label",
            description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
            src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
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
            <main className="row w-100 overflow-hidden mx-0">
                <div className="col-md-4 px-0">
                    <div className="left-panel">
                        <div className="py-5">
                            <h1 className="left-title">Reportages</h1>
                        </div>
                    </div>
                </div>
                <div className="col row align-items-stretch pr-0 overflow-hidden">
                    {
                        reportages.map((e, i) =>
                            <Link href={`/reportages/${e.title.toLocaleLowerCase().split(" ").join('-')}`} key={i}>
                                <div className={`col-4 px-0 ${styles.reportageItem} h-auto`}>
                                    <img src={e.src} alt={e.alt} />
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

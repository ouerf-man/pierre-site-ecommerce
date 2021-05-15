import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { Carousel } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'

const carouselPics = [
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
]

export default function Home() {
  useEffect(() => {
  }, [])
  const [bgDisplay, setDisplay] = useState('')
  return (
    <>
      <Head>
        <title>Pierre Gassin |</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/logo-pierre-3.png" />
      </Head>
      <div className={styles.blackbg} style={{ visibility: bgDisplay }}>
        <h1>Lorem ipsum</h1>
        <p>lorem ipsum diamit lendra</p>
      </div>
      <main className={styles.main}>
        <div className={styles.logo}>
          <Image
            src="/logo-pierre-3.png"
            alt="Picture of the author"
            width={150}
            height='auto'
          />
        </div>
        <div className={styles.aboutLink}>
          <span>Acquisition instantanée de droits de reproduction</span>
        </div>

        <Carousel className="h-100 w-100">
          {
            carouselPics.map((e, i) => <Carousel.Item key={i} className="h-100 position-relative">
              <Image
                priority
                src={e.src}
                alt={e.alt}
                layout='fill'
                objectFit='cover'
                objectPosition='50% 50%'
              />
              <div className={styles.overlay}>

              </div>
              {/* <Carousel.Caption className={styles.carousel_caption}>
                <h3>{e.title}</h3>
                <p>{e.description}</p>
              </Carousel.Caption> */}
            </Carousel.Item>)
          }
        </Carousel>
      </main>
    </>
  )
}


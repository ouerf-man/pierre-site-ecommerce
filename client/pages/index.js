import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { Carousel } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'

const carouselPics = [
  {
    src: "https://pierre-gassin.com/wp-content/uploads/2019/07/Korba-Passementerie-scaled.jpg",
    alt: 'Korba passmenterie',
    title: "First slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
  },
  {
    src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
    alt: 'Korba passmenterie',
    title: "Second slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
  },
  {
    src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tabarka-Fort-Génois-et-Aiguilles-scaled.jpg",
    alt: 'Korba passmenterie',
    title: "Third slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
  }
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

        <Carousel className="h-100">
          {
            carouselPics.map((e, i) => <Carousel.Item key={i} className="h-100 position-relative">
              <div className='w-100' style={{ backgroundImage: `url(${e.src})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
              </div>
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


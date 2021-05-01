import Head from 'next/head'
import styles from '../../styles/Reportage.module.css'
import { useState } from "react"
import {
    Modal,
    Carousel,
    CarouselItem
} from "react-bootstrap"

export default function Home() {
    const [selectedImages, setSelectedImages] = useState([])
    const [show, setShow] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0)
    const handleClose = () => setShow(false);
    const handleShow = (i) => {
        setShow(true);
        setSelectedIndex(i)
    };

    const handleSelect = (selectedIndex, e) => {
        setSelectedIndex(selectedIndex);
    };


    const handleSelectImage = (e, item) => {
        let items = [...selectedImages]
        var ids = items.map(ele => ele.id)
        if (e.target.checked) {
            items.push(item)
        } else {
            var index = ids.indexOf(item.id);
            items.splice(index, 1)
        }

        setSelectedImages(items)
    }
    return (
        <>
            <Head>
                <title>Pierre Gassin | Korba Passementerie</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <main className="row w-100 mx-0 overflow-hidden">
                <div className="col-md-4 px-0">
                    <div className="left-panel">
                        <div className="py-5">
                            <h1 className="left-title" onClick={() => console.log(selectedImages)}>Korba Passementerie</h1>
                        </div>
                    </div>
                </div>
                <div className={`pr-0 overflow-hidden col ${styles.photos} pl-0`}>
                    {
                        reportages.map((e, i) =>
                            <div className="position-relative" key={i} >
                                <img key={i} src={e.src} alt={e.alt} onClick={() => handleShow(i)}/>
                                <input type="checkbox" checked={selectedImages.map(e=>e.id).includes(e.id)} onChange={(evt) => handleSelectImage(evt, e)} className={`${styles.checkbox} form-check-input`} />
                            </div>
                        )
                    }
                </div>
            </main>

            <Modal show={show} dialogClassName='modal-dialog-reportage' onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Carousel activeIndex={selectedIndex} onSelect={handleSelect}>
                        {
                            reportages.map((e, i) => (
                                <Carousel.Item key={i}>
                                    <div className="reportage-modal-image-container mx-auto position-relative">
                                        <img key={i} src={e.src} alt={e.alt} className="d-block h-100"/>
                                        <input type="checkbox" checked={selectedImages.map(e=>e.id).includes(e.id)} onChange={(evt) => handleSelectImage(evt, e)} className={`${styles.checkbox} form-check-input`} />
                                    </div>
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </Modal.Body>
            </Modal>
        </>
    )
}

const reportages = [
    {
        id: 0,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/07/Korba-Passementerie-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 1,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 2,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tabarka-Fort-Génois-et-Aiguilles-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 3,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 4,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/07/Korba-Passementerie-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 5,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 6,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tabarka-Fort-Génois-et-Aiguilles-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 7,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 8,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/07/Korba-Passementerie-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 9,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 10,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tabarka-Fort-Génois-et-Aiguilles-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        id: 11,
        src: "https://pierre-gassin.com/wp-content/uploads/2019/12/Tozeur-Briquetterie-20-scaled.jpg",
        alt: 'Korba passmenterie',
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
]
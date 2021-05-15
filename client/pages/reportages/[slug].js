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
                            <h1 className="left-title">Korba Passementerie</h1>
                            <p className="left-paragraph">Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.
                            </p>

                        </div>
                    </div>
                </div>
                <div className={`pr-0 overflow-hidden col ${styles.photos} pl-0`}>
                    {
                        reportages.map((e, i) =>
                            <div className="position-relative" key={i} >
                                <img key={i} src={e.src} alt={e.alt} onClick={() => handleShow(i)} />
                                <input type="checkbox" checked={selectedImages.map(e => e.id).includes(e.id)} onChange={(evt) => handleSelectImage(evt, e)} className={`${styles.checkbox} form-check-input`} />
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
                                        <img key={i} src={e.src} alt={e.alt} className="d-block h-100" />
                                        <input type="checkbox" checked={selectedImages.map(e => e.id).includes(e.id)} onChange={(evt) => handleSelectImage(evt, e)} className={`${styles.checkbox} form-check-input`} />
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
].map((e, i) => {
    return { ...e, id: i }
})
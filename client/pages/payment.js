import Head from 'next/head'
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from '../styles/Payment.module.css'
import { useRouter } from 'next/router'
import * as apiService from "../src/services/api.reportage.service"
export default function EspaceClient() {
    const [loading, setLoading] = useState(true)
    const [imagesObjects, setImages] = useState([])
    const router = useRouter()
    const { images } = router.query
    useEffect(() => {
        const aux = []
        images.split('-').forEach(async (element, i) => {
            let res = await apiService.getImageById(element)
            if (res.success) {
                aux.push(res.image)
                setImages([...aux])
            }
        });
        setLoading(false)
    }, [])
    return (
        <>
            <Head>
                <title>Pierre Gassin |</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <main className={`row w-100 container-fluid ${styles.main}`}>
                {
                    loading &&
                    <div className="w-100 h-100 text-white d-flex align-items-center justify-content-center">
                        Loading...
                    </div>
                }
                {
                    !loading &&
                    <div className={`d-flex flex-column w-75 mx-auto justify-content-center align-items-center mb-5 ${styles.formsContainer}`}>
                        {imagesObjects.map(e => {
                            return <div key={e._id} className={`${styles.form} d-flex flex-column align-items-center`}>
                                <div style={{ width: 100, height: 100, position: 'relative', marginBottom: '25px' }}>
                                    <Image src={e.tagged}
                                        layout='fill'
                                        objectFit='cover'
                                        objectPosition='50% 50%'>
                                    </Image>
                                </div>
                                <div className="w-100 d-flex justify-content-between">
                                    <div className='form-group mr-3'>
                                        <label>Print</label>
                                        <select class="" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Print</label>
                                        <select class="" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-between">
                                    <div className='form-group mr-3'>
                                        <label>Print</label>
                                        <select class="" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Print</label>
                                        <select class="" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-between">
                                    <div className='form-group mr-3'>
                                        <label>Print</label>
                                        <select class="" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Print</label>
                                        <select class="" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-white">
                                    Prix : 200
                                </div>
                            </div>
                        })}

                        <div className="mb-5">
                            <span className="text-white">Prix finale : 400</span>
                        </div>
                    </div>
                }
            </main>
        </>
    )
}

import Head from 'next/head'
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import styles from '../styles/Payment.module.css'
import { useRouter } from 'next/router'
import * as apiService from "../src/services/api.reportage.service"
import { getCoeff } from "../src/services/api.account.service"
import StipeContainer from "../src/components/Stripe"
import toast from "../src/components/Toast"
import {
    Modal,
} from "react-bootstrap"

export default function EspaceClient() {
    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);
    const [loading, setLoading] = useState(true)
    const [imagesObjects, setImages] = useState([])
    const [finalPrice, setFinalPrice] = useState(0)
    const [formData, setFormData] = useState({})

    const [quoeff, setQuoeff] = useState({})

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
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
        getCoeff().then(res => {
            const data = res.data
            const aux = {
                "support": {
                    "print": data.print,
                    "web": data.web,
                    "printweb": data.print_web
                },
                "diffusion": {
                    "national": data.national,
                    "europe": data.europe,
                    "mondial": data.mondial
                },
                "taille": {
                    "double": data.double,
                    "couverture": data.couverture,
                    "pleine": data.pleine,
                    "demi": data.demi,
                    "quart": data.quart
                },
                "nombre": {
                    "1000": data.n1000,
                    "10000": data.n10000,
                    "100000": data.n100000,
                    "s100000": data.ns100000
                }
            }
            setQuoeff(aux)
            setFinalPrice(imagesObjects.length * data.print)
            setLoading(false)
        })
    }, [])

    const handleChange = (e) => {
        const aux = { ...formData }
        const name = e.target.name
        const data = aux[name.split('--')[1]] ? { ...aux[name.split('--')[1]] } : {}

        data[name.split('--')[0]] = e.target.value
        if (name.split('--')[0] != 'support')
            data['coeff'] = data['coeff'] ? data['coeff'] + quoeff[name.split('--')[0]][e.target.value] : quoeff[name.split('--')[0]][e.target.value]
        else {
            data['base'] = quoeff["support"][e.target.value]
        }
        aux[name.split('--')[1]] = data
        setFormData(aux)
    }

    const handlePaymentRequest = () => {
        if (Object.keys(formData).length != imagesObjects.length) {
            notify("error", "Veuillez saisir tous les informations")
            return
        }
        console.log('izizibi')
        setShow(true)
    }

    useEffect(() => {
        let final = 0
        Object.values(formData).forEach(e => {
            let base = e['base'] ? e['base'] : 0
            let coeff = e['coeff'] ? e['coeff'] : 0
            final += base * coeff
        })
        setFinalPrice(final)
    }, [formData])
    return (
        <>
            <Head>
                <title>Pierre Gassin |</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <main className={`w-100 container-fluid pb-5 ${styles.main}`}>
                {
                    loading &&
                    <div className="w-100 h-100 text-white d-flex align-items-center justify-content-center">
                        Loading...
                    </div>
                }
                {
                    !loading &&
                    <div className={`d-flex flex-column w-75 mx-auto justify-content-center align-items-center py-2 ${styles.formsContainer}`}>
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
                                    <div className='form-group mr-3 col-6'>
                                        <label>Support</label>
                                        <select name={`support--${e._id}`} className="" aria-label="Default select example" onChange={handleChange}>
                                            <option defaultChecked={true}></option>
                                            <option value="print">Print</option>
                                            <option value="web">Web</option>
                                            <option value="printweb">Print+Web</option>
                                        </select>
                                    </div>
                                    <div className='form-group col-6'>
                                        <label>Diffusion</label>
                                        <select name={`diffusion--${e._id}`} className="" aria-label="Default select example" onChange={handleChange}>
                                            <option defaultChecked={true}></option>
                                            <option value="national">National</option>
                                            <option value="europe">Europe</option>
                                            <option value="mondial">Mondial</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-100 d-flex justify-content-between">
                                    <div className='form-group mr-3 col-6'>
                                        <label>Taille</label>
                                        <select name={`taille--${e._id}`} className="" aria-label="Default select example" onChange={handleChange}>
                                            <option defaultChecked></option>
                                            <option value="double">Double page</option>
                                            <option value="couverture">2ème, 3ème our 4ème de couverture</option>
                                            <option value="pleine">Pleine page</option>
                                            <option value="demi">Demi page</option>
                                            <option value="quart">Quart et inférieur</option>
                                        </select>
                                    </div>
                                    <div className='form-group col-6'>
                                        <label>Nombre</label>
                                        <select name={`nombre--${e._id}`} className="" aria-label="Default select example" onChange={handleChange}>
                                            <option defaultChecked></option>
                                            <option value="1000"> {"<"}1000 </option>
                                            <option value="10000"> {"<"}10 000 </option>
                                            <option value="100000"> {"<"}100 000 </option>
                                            <option value="s100000"> {">"}100 000 </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-white">
                                    Prix de base: {(formData[e._id] && formData[e._id]['base']) ? formData[e._id]['base'] : <small>Veuillez choisir le support..</small>}
                                </div>
                                <div className="text-white">
                                    Prix : {
                                        formData[e._id]
                                            ? (formData[e._id]['base']
                                                ? (formData[e._id]['coeff']
                                                    ? formData[e._id]['coeff'] * formData[e._id]['base']
                                                    : formData[e._id]['base'])
                                                : 0)
                                            : 0
                                    }
                                </div>
                            </div>
                        })}

                        <div className="mb-5">
                            <span className="text-white">Prix finale : {finalPrice}</span>
                        </div>
                        <button className="btn btn-secondary mt-3" onClick={() => handlePaymentRequest()}>Informations de payment</button>
                    </div>
                }
                <Modal show={show} dialogClassName='payment-modal' onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <StipeContainer images={imagesObjects.map(e => e._id)} ammount={finalPrice * 100} />
                    </Modal.Body>
                </Modal>

            </main>
        </>
    )
}

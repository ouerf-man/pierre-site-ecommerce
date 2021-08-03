import React, { useEffect, useState } from "react"
import {
    CContainer,
    CCol,
    CRow,
    CFormGroup,
    CLabel,
    CInput,
    CForm,
    CButton
} from '@coreui/react'

import { getCoeff, updateCoeff } from "../../services/api.service"

function Coeff(props) {
    const [print, setPrintTo] = useState(null)
    const [web, setWebTo] = useState(null)
    const [printWeb, setPrintWebTo] = useState(null)

    const [national, setNationalTo] = useState(null)
    const [europe, setEuropeTo] = useState(null)
    const [mondial, setMondialTo] = useState(null)

    const [double, setDoubleTo] = useState(null)
    const [couverture, setCouvertureTo] = useState(null)
    const [pleine, setPleineTo] = useState(null)
    const [demi, setDemiTo] = useState(null)
    const [quart, setQuartTo] = useState(null)

    const [n1000, setN1000To] = useState(null)
    const [n10000, setN10000To] = useState(null)
    const [n100000, setN100000To] = useState(null)
    const [ns100000, setNs100000To] = useState(null)

    const [coeffId, setCoeffId] = useState(null)
    const [loading, setLoading] = useState(false)
    const getCoeffs = async ()=>{
        const res = await getCoeff()
        return JSON.parse(res.data)
    }

    useEffect(()=>{
        getCoeffs().then(data=>{
            setPrintTo(data.Print)
            setWebTo(data.Web)
            setPrintWebTo(data.Print_web)

            setNationalTo(data.National)
            setEuropeTo(data.Europe)
            setMondialTo(data.Mondial)

            setDoubleTo(data.Double)
            setCouvertureTo(data.Couverture)
            setPleineTo(data.Pleine)
            setDemiTo(data.Demi)
            setQuartTo(data.Quart)

            setN1000To(data.n1000)
            setN10000To(data.n10000)
            setN100000To(data.n100000)
            setNs100000To(data.ns100000)

            setCoeffId(data._id)
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const body = {
            print,
            web,
            print_web : printWeb,
            national,
            europe,
            mondial,
            double,
            couverture,
            demi,
            pleine,
            quart,
            n1000,
            n10000,
            n100000,
            ns100000
        }

        updateCoeff(coeffId,body).then(e=>{
            setLoading(false)
            if(e.success){
                alert('Success')
            }
        })
    }
    return <CContainer>
        <CForm action="" method="post" onSubmit={handleSubmit}>

            <div>
                <h2>
                    Support (base)
                </h2>
                <CRow>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Print</CLabel>
                            <CInput
                                required
                                type="number"
                                id="print"
                                name="print"
                                value={print}
                                onChange={(e) => setPrintTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Web</CLabel>
                            <CInput
                                required
                                type="number"
                                id="web"
                                name="web"
                                value={web}
                                onChange={(e) => setWebTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Print et web</CLabel>
                            <CInput
                                type="number"
                                required
                                id="printWeb"
                                name="printWeb"
                                placeholder=""
                                autoComplete=""
                                value={printWeb}
                                onChange={(e) => setPrintWebTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                </CRow>
            </div>
            <div>
                <h2>
                    Diffusion
                </h2>
                <CRow>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">National</CLabel>
                            <CInput
                                required
                                type="number"
                                id="national"
                                name="national"
                                value={national}
                                onChange={(e) => setNationalTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Europe</CLabel>
                            <CInput
                                required
                                type="number"
                                id="europe"
                                name="europe"
                                value={europe}
                                onChange={(e) => setEuropeTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Mondial</CLabel>
                            <CInput
                                type="number"
                                required
                                id="mondial"
                                name="mondial"
                                value={mondial}
                                onChange={(e) => setMondialTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                </CRow>
            </div>
            <div>
                <h2>
                    Taille
                </h2>
                <CRow>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Double</CLabel>
                            <CInput
                                required
                                type="number"
                                id="double"
                                name="double"
                                value={double}
                                onChange={(e) => setDoubleTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Couverture</CLabel>
                            <CInput
                                required
                                type="number"
                                id="couverture"
                                name="couverture"
                                value={couverture}
                                onChange={(e) => setCouvertureTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Pleine</CLabel>
                            <CInput
                                type="number"
                                required
                                id="pleine"
                                name="pleine"
                                value={pleine}
                                onChange={(e) => setPleineTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Demi</CLabel>
                            <CInput
                                type="number"
                                required
                                id="demi"
                                name="demi"
                                value={demi}
                                onChange={(e) => setDemiTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">Quart</CLabel>
                            <CInput
                                type="number"
                                required
                                id="quart"
                                name="quart"
                                value={quart}
                                onChange={(e) => setQuartTo(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                </CRow>
            </div>
            <div>
                <h2>
                    Nombre
                </h2>
                <CRow>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">{"<"}1 000</CLabel>
                            <CInput
                                required
                                type="number"
                                id="n1000"
                                name="n1000"
                                value={n1000}
                                onChange={(e) => setN1000To(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">{"<"}10 000</CLabel>
                            <CInput
                                required
                                type="number"
                                id="n10000"
                                name="n10000"
                                value={n10000}
                                onChange={(e) => setN10000To(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">{"<"}100 000</CLabel>
                            <CInput
                                type="number"
                                required
                                id="n100000"
                                name="n100000"
                                value={n100000}
                                onChange={(e) => setN100000To(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup>
                            <CLabel htmlFor="titre">{">"}100 000</CLabel>
                            <CInput
                                type="number"
                                required
                                id="ns100000"
                                name="ns100000"
                                value={ns100000}
                                onChange={(e) => setNs100000To(e.target.value)}
                            />
                        </CFormGroup>
                    </CCol>
                </CRow>
            </div>
            <CFormGroup className="form-actions">
                <CButton disabled={loading} type="submit" size="sm" color="success">Submit</CButton>
            </CFormGroup>
        </CForm>
    </CContainer>
}

export default Coeff
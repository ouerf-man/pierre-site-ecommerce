import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from 'react-router-dom'

import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination,
    CButton,
} from '@coreui/react'
import { getActualite } from "../../services/api.service";

const CMS = () => {
    const [actualites, setActualites]= useState([])
    useEffect(async ()=>{
        const data = await getActualite()
        console.log(data)
        setActualites(data)
    },[])
    const history = useHistory()
    return <CRow>
        <CCol xl={12}>
            <CCard>
                <CCardHeader>
                    Actualités
                    <CButton
                        color="success"
                        size="sm"
                        className="ml-5"
                        onClick={() => history.push("/ajouter-actualité")}
                    >
                        Ajouter actualité
                    </CButton>
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={actualites?.map(e=>({id:e.id,title:e.title,createdAt:e.createdAt}))}
                        fields={[
                            { key: "id", _classes: "font-weight-bold" },
                            "title",
                            "createdAt",
                        ]}
                        hover
                        striped
                        //itemsPerPage={5}
                        //activePage={page}
                        clickableRows
                        //onRowClick={(item) => history.push(`/teacher/${item.id}`)}
                    />
                    {/* <CPagination
                        activePage={page}
                        onActivePageChange={pageChange}
                        pages={5}
                        doubleArrows={false}
                        align="center"
                    /> */}
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
}

export default CMS

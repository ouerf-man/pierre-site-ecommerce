import React from "react"
import { useHistory, useLocation } from 'react-router-dom'

import {
    CCol,
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CTabs,
    CNav,
    CNavItem,
    CTabContent,
    CTabPane,
    CNavLink,
    CListGroup,
    CListGroupItem,
    CButton
} from '@coreui/react'
const CMS = () => {
    const history = useHistory()
    return <CRow>
        <CCol xl={12}>
            <CCard>
                <CCardHeader>
                    Menu
                </CCardHeader>
                <CCardBody>
                    <CTabs>
                        <CNav variant="tabs">
                            <CNavItem>
                                <CNavLink>
                                    INSAT
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink>
                                    Bibliothéque
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink>
                                    Vie Etudiante
                                </CNavLink>
                            </CNavItem>
                            <CButton color="primary" size="sm" className="ml-2">
                                Ajouter un lien parent
                            </CButton>
                        </CNav>
                        <CTabContent>
                            <CTabPane>
                                <CListGroup>
                                    <CListGroupItem>Mot de directeur</CListGroupItem>
                                    <CListGroupItem>Documents administratifs</CListGroupItem>
                                    <CListGroupItem>Guide des etudiants</CListGroupItem>
                                    <CListGroupItem>Départements</CListGroupItem>
                                    <CListGroupItem>
                                        <CButton color="primary" size="sm" className="ml-2" onClick={()=>history.push('/cms/page')}>
                                            Ajouter une page
                                        </CButton>
                                    </CListGroupItem>
                                </CListGroup>
                            </CTabPane>
                            <CTabPane>
                                <CListGroup>
                                    <CListGroupItem>Mot de directeur</CListGroupItem>
                                    <CListGroupItem>Documents administratifs</CListGroupItem>
                                    <CListGroupItem>Guide des etudiants</CListGroupItem>
                                    <CListGroupItem>Départements</CListGroupItem>
                                    <CListGroupItem>
                                        <CButton color="primary" size="sm" className="ml-2">
                                            Ajouter une page
                                        </CButton>
                                    </CListGroupItem>
                                </CListGroup>
                            </CTabPane>
                            <CTabPane>
                                <CListGroup>
                                    <CListGroupItem>Mot de directeur</CListGroupItem>
                                    <CListGroupItem>Documents administratifs</CListGroupItem>
                                    <CListGroupItem>Guide des etudiants</CListGroupItem>
                                    <CListGroupItem>Départements</CListGroupItem>
                                    <CListGroupItem>
                                        <CButton color="primary" size="sm" className="ml-2">
                                            Ajouter une page
                                        </CButton>
                                    </CListGroupItem>
                                </CListGroup>
                            </CTabPane>
                        </CTabContent>
                    </CTabs>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
}

export default CMS

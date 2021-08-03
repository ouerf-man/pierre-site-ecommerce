import React, { useState, useEffect } from 'react'
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

import { useRef } from 'react'
import { getReportages } from 'src/services/api.service'
import { useToasts } from "react-toast-notifications"
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [reportages, setReportages] = useState(null);
  const [page, setPage] = useState(currentPage)
  const { addToast } = useToasts()
  const fileInput = useRef(null);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/students?page=${newPage}`)
  }


  const getAllReportages = async () => {
    const result = await getReportages();
    setReportages(JSON.parse(result.data));
  }


  useEffect(() => {
    getAllReportages();
  }, [])

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Reportages
            <CButton color="success" size="sm" className="ml-5" onClick={() => history.push("/create-reportage")}>
              Ajouter un reportage
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={reportages}
              fields={[
                { key: 'Slug', _classes: 'font-weight-bold' },
                'Title', 'Description'
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/create-reportage/${item.ReportageId}`)}
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users

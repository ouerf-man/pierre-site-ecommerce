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
import {allClasses } from 'src/services/api.service'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Classes = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [classes, setClasses] = useState(null);
  const [page, setPage] = useState(currentPage)

  const fileInput = useRef(null);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/class?page=${newPage}`)
  }

  const getAllClasses = async () => {
    const result = await allClasses();
    setClasses(result);
  }


  useEffect(() => {
    getAllClasses();
  }, [])

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Classes
            <CButton color="success" size="sm" className="ml-5" onClick={() => history.push("/create-class")}>
                Ajouter Classe
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={classes}
              fields={[
                { key: 'intitule', _classes: 'font-weight-bold' },
                
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/class/${item.id}`)}
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

export default Classes

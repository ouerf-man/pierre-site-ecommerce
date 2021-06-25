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
import { deleteBlog, getBlogs } from 'src/services/api.service'
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
  const [page, setPage] = useState(currentPage)

  const [supprimer, setDelete] = useState(false)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/students?page=${newPage}`)
  }

  const [blogs, setBlogs] = useState([])

  const getBlogsEffect = async () => {
    const result = await getBlogs()
    setBlogs(result.data)
  }

  const handleDelete = async (id) => {
    const result = await deleteBlog(id)
    if (result.success)
      setDelete(false)
    else alert(result.message)
  }

  useEffect(() => {
    getBlogsEffect()
  }, [])

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Blogs
            <CButton color="success" size="sm" className="ml-5" onClick={() => history.push("/create-blog")}>
              Ajouter un blog
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={blogs}
              fields={[
                { key: 'slug', _classes: 'font-weight-bold' },
                'title',
                {
                  key: 'Supprimer',
                  label: 'Actions',
                  sorter: false,
                  filter: false
                }
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              scopedSlots={{
                'Supprimer': (item, index) => {
                  return (
                    <td>
                      {
                        supprimer ?
                          <CButton
                            color="danger"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => { handleDelete(item._id) }}
                          >
                            Veuillez confirmer
                          </CButton>
                          :
                          <CButton
                            color="danger"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => { setDelete(true) }}
                          >
                            Supprimer
                          </CButton>
                      }
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={(item) => history.push(`/create-blog/${item._id}`)}
                      >
                        Mise à jour
                      </CButton>
                    </td>
                  )
                }
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

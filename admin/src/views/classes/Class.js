import React, {useState, useEffect} from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'


import { getClassById } from "../../services/api.service";
import { useHistory } from 'react-router';


const User = ({match}) => {
  const history = useHistory();
  const [classDetail, setClassDetail] = useState(null);


  const getClass = async (id) => {
    const result = await getClassById(id);
    setClassDetail(result);
  }

  useEffect(() => {
    getClass(match.params.id)
  }, [])

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Class
            <CButton color="success" size="sm" className="ml-5" onClick={() => history.push(`/edit-class/${match.params.id}`)}>
                Edit Class
            </CButton>
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    classDetail ? Object.keys(classDetail).map((key, index) => {
                      return typeof(classDetail[key]) === "string" ? 
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{classDetail[key]}</strong></td>
                        </tr>
                      : null
                    }) : null
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User

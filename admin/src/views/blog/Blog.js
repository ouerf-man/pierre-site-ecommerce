import React, {useState, useEffect} from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'


/* import { getStudentById } from "../../services/api.service";
 */

const User = ({match}) => {
  const [studentDetail, setStudentDetail] = useState(null);


  /* const getStudent = async (id) => {
    const result = await getStudentById(id);
    console.log(result)
    setStudentDetail(result);
  }

  useEffect(() => {
    getStudent(match.params.id)
  }, []) */

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Class
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    studentDetail ? Object.keys(studentDetail).map((key, index) => {
                      return typeof(studentDetail[key]) === "string" ? 
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{studentDetail[key]}</strong></td>
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

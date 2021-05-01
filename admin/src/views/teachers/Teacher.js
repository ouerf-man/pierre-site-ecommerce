import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

import { getTeacherById } from "../../services/api.teacher.service";

const Teacher = ({ match }) => {
  const [teacherDetail, setTeacherDetail] = useState(null);

  const getTeacher = async (id) => {
    const result = await getTeacherById(id);
    console.log(result);
    setTeacherDetail(result);
  };

  useEffect(() => {
    getTeacher(match.params.id);
  }, []);

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>Class</CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {teacherDetail
                  ? Object.keys(teacherDetail).map((key, index) => {
                      return typeof teacherDetail[key] === "string" ? (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td>
                            <strong>{teacherDetail[key]}</strong>
                          </td>
                        </tr>
                      ) : null;
                    })
                  : null}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Teacher;

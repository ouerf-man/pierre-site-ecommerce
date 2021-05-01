import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
} from "@coreui/react";

import { useRef } from "react";
import { uploadFile, allTeachers } from "src/services/api.teacher.service";
import { useToasts } from "react-toast-notifications";
const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Teachers = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [teachers, setTeachers] = useState(null);
  const [page, setPage] = useState(currentPage);
  const { addToast } = useToasts();
  const fileInput = useRef(null);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/teachers?page=${newPage}`);
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const result = await uploadFile(formData);
    addToast(result.message, { appearance: "error", autoDismiss: true });
    getAllTeachers();
  };

  const getAllTeachers = async () => {
    const result = await allTeachers();
    setTeachers(result);
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Enseignants
            <CButton
              color="success"
              size="sm"
              className="ml-5"
              onClick={() => history.push("/create-teacher")}
            >
              Ajouter Enseignant
            </CButton>
            <CButton
              color="success"
              size="sm"
              className="ml-5"
              onClick={() => fileInput.current.click()}
            >
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInput}
                onChange={handleUpload}
              />
              Ajouter Enseignant d'apres un fichier xl
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={teachers}
              fields={[
                { key: "cin", _classes: "font-weight-bold" },
                "nom",
                "prenom",
                "email",
                "date_de_naissance",
                "sexe",
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/teacher/${item.id}`)}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
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
  );
};

export default Teachers;

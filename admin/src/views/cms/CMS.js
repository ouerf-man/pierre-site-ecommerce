import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CInput,
  CTextarea,
  CForm,
  CButton,
} from "@coreui/react";
import { getInfos, updateInfos } from "src/services/api.service";

const CMS = () => {
  const getInfosEffect = async () => {
    const res = await getInfos();
    return res;
  };

  const [infos, setInfos] = useState({});

  const [title, setTitleTo] = useState(null);
  const [description, setDescriptionTo] = useState(null);
  const [infosId, setInfosId] = useState();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getInfosEffect().then((infos) => {
      setInfosId(infos.data._id);
      setTitleTo(infos?.data?.title);
      setDescriptionTo(infos?.data?.description);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      title,
      description,
    };
    updateInfos(infosId, body).then((e) => {
      setLoading(false);
      if (e.success) {
        alert("Success");
      }
    });
  };

  return (
    <CForm action="" method="post" onSubmit={handleSubmit}>
      <CRow>
        <CCol lg={3}>
          <CCard>
            <CCardHeader>Titre</CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CInput
                  required
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitleTo(e.target.value)}
                />
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={5}>
          <CCard>
            <CCardHeader>Description</CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CTextarea
                  required
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setTitleTo(e.target.value)}
                ></CTextarea>
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CFormGroup className="form-actions">
        <CButton disabled={loading} type="submit" size="sm" color="success">
          Submit
        </CButton>
      </CFormGroup>
    </CForm>
  );
};

export default CMS;

import React, { useState } from 'react'
import {
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CContainer,
  CFormText,
  CButton,
  CTextarea
} from '@coreui/react'

import { useHistory } from "react-router-dom";

import * as apiService from "../../services/api.service";






const AddStudent = (props) => {

  const history = useHistory();
  const [reportageSlug, setReportageSlug] = useState(null)
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [previewImages, setPreviewImages] = useState([])
  const [files, setFiles] = useState([])

  React.useEffect(async () => {
    if (props.match.params.id) {
      setReportageSlug(props.match.params.id)
      const reportage = await apiService.getReportage(props.match.params.id)
      console.log(reportage)
      setTitre(reportage.data.title)
      setDescription(reportage.data.description)
      setPreviewImages(reportage.data.images.map(e=>([e.tagged,e.size1,e.size2,e.size3])))
    }
  }, [])

  const handleFileChange = (e, i) => {
    const aux = [...files]
    aux[i] = e.target.files[0]
    setFiles(aux)
  }

  const handleFilesUpload = async () => {
    if (files.length != 4) {
      alert('4 files required')
      return
    }
    const preview = [...previewImages]
    preview.push(files.map(e => URL.createObjectURL(e)))
    setPreviewImages(preview)
    const fd = new FormData()
    fd.append('tagged', files[0])
    fd.append('size1', files[1])
    fd.append('size2', files[2])
    fd.append('size3', files[3])
    console.log(fd)
    await apiService.addPhoto(props.match.params.id, fd)
    setFiles([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!titre || !description)
      alert("missing fields");

    const body = {
      title: titre,
      description,
    }
    const result = await apiService.addReportage(body);
    if (result.success)
      history.push("/create-reportage/" + result.data)
    else {
      alert(result.message)
    }
  }


  return (
    <CContainer>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post" onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel htmlFor="titre">Titre</CLabel>
              <CInput
                type="text"
                id="titre"
                name="titre"
                placeholder="Enter le titre..."
                autoComplete="titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
              <CFormText className="help-block">Entrer le titre du reportage</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="description">Description</CLabel>
              <CTextarea
                id="description"
                name="description"
                placeholder="Enter description.."
                autoComplete="current-Name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
              </CTextarea>
            </CFormGroup>
            <CFormGroup className="form-actions">
              <CButton type="submit" size="sm" color="success">Submit</CButton>
            </CFormGroup>
          </CForm>
          {
            previewImages.map(e => {
              return <CRow className="mb-1">
                {
                  e.map((file) => (
                    <CCol sm="2" >
                      <CFormGroup>
                        {file && <img height="120px" src={file} />}
                      </CFormGroup>
                    </CCol>
                  ))
                }
                <CCol sm="2" >
                  <CButton size="sm" color="danger">supprimer</CButton>
                </CCol>
              </CRow>
            })
          }
          {
            props.match.params.id &&
            <CRow>
              <CCol sm="3">
                <CFormGroup>
                  <CLabel htmlFor="titre">LOW 510x340</CLabel>
                  <CInput
                    type="file"
                    id="titre"
                    name="titre"
                    placeholder="Enter le titre..."
                    autoComplete="titre"
                    onChange={(e) => handleFileChange(e, 0)}
                  />
                  {files[0] && <img height="120px" src={URL.createObjectURL(files[0])} />}
                </CFormGroup>
              </CCol>
              <CCol sm="3">
                <CFormGroup>
                  <CLabel htmlFor="titre">5680x3781</CLabel>
                  <CInput
                    type="file"
                    id="titre"
                    name="titre"
                    placeholder="Enter le titre..."
                    autoComplete="titre"
                    onChange={(e) => handleFileChange(e, 1)}
                  />
                  {files[1] && <img height="120px" src={URL.createObjectURL(files[1])} />}
                </CFormGroup>
              </CCol>
              <CCol sm="3">
                <CFormGroup>
                  <CLabel htmlFor="titre">4252x2835</CLabel>
                  <CInput
                    type="file"
                    id="titre"
                    name="titre"
                    placeholder="Enter le titre..."
                    autoComplete="titre"
                    onChange={(e) => handleFileChange(e, 2)}
                  />
                  {files[2] && <img height="120px" src={URL.createObjectURL(files[2])} />}
                </CFormGroup>
              </CCol>
              <CCol sm="3">
                <CFormGroup>
                  <CLabel htmlFor="titre">2126x1417</CLabel>
                  <CInput
                    type="file"
                    id="titre"
                    name="titre"
                    placeholder="Enter le titre..."
                    autoComplete="titre"
                    onChange={(e) => handleFileChange(e, 3)}
                  />
                  {files[3] && <img height="120px" src={URL.createObjectURL(files[3])} />}
                </CFormGroup>
              </CCol>
              <CButton size="sm" color="success" onClick={handleFilesUpload}>Ajouter</CButton>
            </CRow>
          }
        </CCol>
      </CRow>
    </CContainer >
  )
}

export default AddStudent;

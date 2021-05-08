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

import { addStudent } from "../../services/api.service";






const AddStudent = (props) => {

  const history = useHistory();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [previewImages, setPreviewImages] = useState([])
  const [files, setFiles] = useState([])
  const handleFileChange = (e, i) => {
    const aux = [...files]
    aux[i] = e.target.files[0]
    setFiles(aux)
  }

  const handleFilesUpload = () => {
    const preview = [...previewImages]
    preview.push(files.map(e => URL.createObjectURL(e)))
    setPreviewImages(preview)
    setFiles([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push("/create-reportage/" + "qsd538a46qs1d35")

    /*if (!titre || !description)
      alert("missing fields");

    const body = {
      titre,
      description,
    }
    const result = await addStudent(body);
    console.log(result);
    history.push("/students");*/
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
                  <CLabel htmlFor="titre">Image low size</CLabel>
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
                  <CLabel htmlFor="titre">Image resolution 1</CLabel>
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
                  <CLabel htmlFor="titre">Image resolution 2</CLabel>
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
                  <CLabel htmlFor="titre">Image resolution 3</CLabel>
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

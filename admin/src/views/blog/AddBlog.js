import React, { useEffect, useState } from 'react'
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

import { addBlog, addBlogBanner, getBlog } from "../../services/api.service";






const AddStudent = (props) => {

  const history = useHistory();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const handleFileChange = (e) => {
    const aux = e.target.files[0]
    setFile(aux)
    setPreview(URL.createObjectURL(aux))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !description)
      alert("missing fields");
    let imageUrl = ''
    try {
      const fd = new FormData()
      fd.append('cover', file)
      const res = await addBlogBanner(fd)
      imageUrl = res.url
    } catch (e) {
      console.log(e.message)
    }
    const body = {
      title: titre,
      description,
      cover: imageUrl
    }
    try {
      const result = await addBlog(body);
      history.push("/create-blog/" + result.data);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (props.match.params.id) {
      getBlog(props.match.params.id).then(res => {
        setTitre(res.data.title)
        setDescription(res.data.description)
        setPreview(res.data.cover)
      })
    }
  }, [])

  return (
    <CContainer>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post" onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel htmlFor="titre">Banner</CLabel>
              <CInput
                type="file"
                id="titre"
                name="titre"
                placeholder="Enter le titre..."
                autoComplete="titre"
                onChange={(e) => handleFileChange(e)}
              />
              {file && <img src={preview} />}
            </CFormGroup>
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
              <CFormText className="help-block">Entrer le titre du blog</CFormText>
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

        </CCol>
      </CRow>
    </CContainer >
  )
}

export default AddStudent;

import React, { useRef, useState } from "react";
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
  CTextarea,
} from "@coreui/react";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledDocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import { useHistory } from "react-router-dom";

import * as apiService from "../../services/api.service";
import { api } from "../../services/api.service";

const AddStudent = (props) => {
  const customAddPhoto = (id, body) => {
    return axios
      .post(`${api}/reportage/${id}/image`, body)
      .then((res) => {
        if (res.status === 200) {
          return res.data || null;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };
  const inputLotRef = useRef();
  const history = useHistory();
  const [reportageSlug, setReportageSlug] = useState(null);
  const [reportageId, setReportageId] = useState(null);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  React.useEffect(async () => {
    if (props.match.params.id) {
      setReportageSlug(props.match.params.id);
      const reportage = await apiService.getReportage(props.match.params.id);
      setReportageId(props.match.params.id);
      setTitre(reportage.data.title);
      setDescription(reportage.data.description);
      setPreviewImages(
        reportage.data.images.map((e) => [
          e._id,
          [e.tagged, e.size1, e.size2, e.size3],
        ])
      );
    }
  }, []);

  const handleFileChange = (e, i) => {
    const aux = [...files];
    aux[i] = e.target.files[0];
    setFiles(aux);
  };

  const handleFilesUpload = async () => {
    setLoadingFiles(true);
    if (files.length != 4) {
      alert("4 files required");
      setLoadingFiles(false);
      return;
    }
    const fd = new FormData();
    fd.append("tagged", files[0]);
    fd.append("size1", files[1]);
    fd.append("size2", files[2]);
    fd.append("size3", files[3]);
    await customAddPhoto(props.match.params.id, fd)
      .then(async (res) => {
        setLoadingFiles(false);
        const reportage = await apiService.getReportage(
          props.match.params.id
        );
        setPreviewImages(
          reportage.data.images.map((e) => [
            e._id,
            [e.tagged, e.size1, e.size2, e.size3],
          ])
        );
      })
      .catch((err) => setLoadingFiles(false));
    setFiles([]);
  };

  const handleFilesUploadLot = (e) => {
    const files = e.target.files;
    const finalFormat = {};
    files.forEach((element) => {
      let nameBySpace = element.name.split(" ");
      let lastPart = nameBySpace[nameBySpace.length - 1];
      let imageId;
      let size;
      if (lastPart.split("-").length === 1) {
        lastPart = nameBySpace[nameBySpace.length - 2];
        imageId = lastPart.split(".")[1];
        size = lastPart.split(".")[0];
      }
      imageId = lastPart.split(".")[0].split("-")[1];
      size = lastPart.split(".")[0].split("-")[0];
      if (Object.keys(finalFormat).includes(imageId)) {
        let aux = { ...finalFormat[imageId] };
        aux[size] = element;
        finalFormat[imageId] = aux;
      } else {
        let aux = {};
        aux[size] = element;
        finalFormat[imageId] = aux;
      }
    });
    let counterToLoad = Object.values(finalFormat).length;
    Object.values(finalFormat).forEach(async (ele, index) => {
      if (Object.values(ele).length == 4) {
        setLoadingFiles(true);
        const fd = new FormData();
        fd.append("tagged", ele["510"]);
        fd.append("size1", ele["5680"]);
        fd.append("size2", ele["4252"]);
        fd.append("size3", ele["2126"]);
        await customAddPhoto(props.match.params.id, fd)
          .then(async (res) => {
            console.log("cbn");
            counterToLoad--;
            const reportage = await apiService.getReportage(
              props.match.params.id
            );
            setPreviewImages(
              reportage.data.images.map((e) => [
                e._id,
                [e.tagged, e.size1, e.size2, e.size3],
              ])
            );
            if (counterToLoad == 0) setLoadingFiles(false);
          })
          .catch((err) => setLoadingFiles(false));
      } else {
        counterToLoad--;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !description) alert("missing fields");

    const body = {
      title: titre,
      description,
    };
    if (props.match.params.id) {
      const result = await apiService.updateReportage(body, reportageId);
      if (result.success) history.push("/create-reportage/" + result.data);
      else {
        alert(result.message);
      }
    } else {
      const result = await apiService.addReportage(body);
      if (result.success) history.push("/create-reportage/" + result.data);
      else {
        alert(result.message);
      }
    }
  };

  const handleDeletePhoto = async (id) => {
    const result = await apiService.deletePhoto(id);
    if (result.success) {
      const reportage = await apiService.getReportage(
        props.match.params.id
      );
      setPreviewImages(
        reportage.data.images.map((e) => [
          e._id,
          [e.tagged, e.size1, e.size2, e.size3],
        ])
      );
    } else {
      alert("error occured");
    }
  };

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
              <CFormText className="help-block">
                Entrer le titre du reportage
              </CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="description">Description</CLabel>
              <div>
                <div id="toolbar-container"></div>
                <CKEditor
                  editor={DecoupledDocumentEditor}
                  data={description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                  onReady={(editor) => {
                    // Add the toolbar to the container
                    const toolbarContainer =
                      document.querySelector("#toolbar-container");
                    toolbarContainer.appendChild(
                      editor.ui.view.toolbar.element
                    );

                    window.editor = editor;
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                />
              </div>
            </CFormGroup>
            <CFormGroup className="form-actions">
              <CButton type="submit" size="sm" color="success">
                Submit
              </CButton>
            </CFormGroup>
          </CForm>
          {previewImages.map((e) => {
            return (
              <CRow className="mb-1">
                {e[1].map((file) => (
                  <CCol sm="2">
                    <CFormGroup>
                      {file && <img height="120px" src={file} />}
                    </CFormGroup>
                  </CCol>
                ))}
                <CCol sm="2">
                  <CButton size="sm" color="danger" onClick={()=>handleDeletePhoto(e[0])}>
                    supprimer
                  </CButton>
                </CCol>
              </CRow>
            );
          })}
          {props.match.params.id && (
            <>
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
                    {files[0] && (
                      <img height="120px" src={URL.createObjectURL(files[0])} />
                    )}
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
                    {files[1] && (
                      <img height="120px" src={URL.createObjectURL(files[1])} />
                    )}
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
                    {files[2] && (
                      <img height="120px" src={URL.createObjectURL(files[2])} />
                    )}
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
                    {files[3] && (
                      <img height="120px" src={URL.createObjectURL(files[3])} />
                    )}
                  </CFormGroup>
                </CCol>
                <CButton
                  size="sm"
                  color="success"
                  disabled={loadingFiles}
                  onClick={handleFilesUpload}
                >
                  {loadingFiles ? (
                    <>
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </>
                  ) : (
                    "Ajouter"
                  )}
                </CButton>
              </CRow>
              <hr />
              <p>Ou</p>
              <CRow className={"mb-5"}>
                <CButton
                  size="sm"
                  color="success"
                  disabled={loadingFiles}
                  onClick={() => inputLotRef.current.click()}
                >
                  {loadingFiles ? (
                    <>
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </>
                  ) : (
                    "Ajouter par lot"
                  )}
                </CButton>
                <input
                  ref={inputLotRef}
                  style={{ visibility: "hidden" }}
                  type={"file"}
                  multiple
                  onChange={handleFilesUploadLot}
                />
              </CRow>
            </>
          )}
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddStudent;

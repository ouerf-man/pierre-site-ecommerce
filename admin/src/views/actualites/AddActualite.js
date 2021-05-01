import React, {useState} from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import DecoupledDocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document"
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
    CInputFile,

} from '@coreui/react'
import { addActualite } from "../../services/api.service";
import { useHistory } from "react-router-dom";

export default function AddPage() {
    const history = useHistory();
    const categories = [
        'INSAT',
        "Recherche",
        "Formation",
        "Entreprise",
        "International",
        "Vie etudiante"
    ]

    const [image, setImage]= useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)
    const handleFileChange = (e) => {
        setImage(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !description || !category){
            alert('required fields')
        }
        var data = new FormData();
        data.append("file", image);
        data.append("title",title);
        data.append("description",description)
        data.append("category",category)
        const res = await addActualite(data)
        if(res){
            history.push('/actualites')
        }
    }

    return (
        <CContainer>
            <CRow>
                <CCol xs="12">
                    <CForm action="" method="post" onSubmit={handleSubmit}>
                        <CFormGroup>
                            <CLabel htmlFor="intitule">Titre du page</CLabel>
                            <CInput
                                type="text"
                                id="titre"
                                name="titre"
                                placeholder="Enter le titre.."
                                autoComplete="titre"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                required
                            />
                            <CFormText className="help-block">Veuillez inserer le titre du page (header)</CFormText>
                        </CFormGroup>
                        <CFormGroup row>
                            <CLabel col md="3" htmlFor="file-input">Image du header</CLabel>
                            <CCol xs="12" md="9">
                                <CInputFile id="file-input" name="file-input" onChange={handleFileChange}/>
                            </CCol>
                        </CFormGroup>
                        <img width="100%" src={previewImage} />
                        <CFormGroup>
                            <CLabel htmlFor="categorie">Categorie</CLabel>
                            <CSelect custom name="categorie" id="categorie" value={category} onChange={(e)=>setCategory(e.target.value)} >
                                {
                                    categories.map((e, i) => (
                                        <option key={i} value={e}>{e}</option>
                                    ))
                                }
                            </CSelect>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="intitule">Description du page</CLabel>
                            <div>
                                <div id="toolbar-container"></div>
                                <CKEditor
                                    editor={DecoupledDocumentEditor}
                                    data={description}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setDescription(data);
                                    }}
                                    config={{
                                        ckfinder: {
                                            // Upload the images to the server using the CKFinder QuickUpload command.
                                            uploadUrl: '/upload',
                                            filebrowserBrowseUrl: "/files"
                                        },
                                    }}
                                    onReady={editor => {
                                        // Add the toolbar to the container
                                        const toolbarContainer = document.querySelector('#toolbar-container');
                                        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                        window.editor = editor;
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                />
                            </div>
                            <CFormText className="help-block">Veuillez inserer la description</CFormText>
                        </CFormGroup>

                        <CFormGroup className="form-actions">
                            <CButton type="submit" size="sm" color="success">Submit</CButton>
                        </CFormGroup>
                    </CForm>
                </CCol>
            </CRow>
        </CContainer>
    )
}
import React from "react"
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
    CButton

} from '@coreui/react'

export default function AddPage() {
    return (
        <CContainer>
            <CRow>
                <CCol xs="12">
                    <CForm action="" method="post" /*onSubmit={handleSubmit}*/>
                        <CFormGroup>
                            <CLabel htmlFor="intitule">Lien du page</CLabel>
                            <CInput
                                type="text"
                                id="lien"
                                name="lien"
                                placeholder="Enter le lien.."
                                autoComplete="lien"
                            //onChange={(e) => setIntitule(e.target.value)}
                            //value={intitule}
                            />
                            <CFormText className="help-block">Veuillez inserer le lien du page</CFormText>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="intitule">Titre du page</CLabel>
                            <CInput
                                type="text"
                                id="titre"
                                name="titre"
                                placeholder="Enter le titre.."
                                autoComplete="titre"
                            //onChange={(e) => setIntitule(e.target.value)}
                            //value={intitule}
                            />
                            <CFormText className="help-block">Veuillez inserer le titre du page</CFormText>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="intitule">Description du page</CLabel>
                            <div>
                                <div id="toolbar-container"></div>
                                <CKEditor
                                    editor={DecoupledDocumentEditor}
                                    //data={description}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        //setDescription(data);
                                    }}
                                    config={{
                                        ckfinder: {
                                            // Upload the images to the server using the CKFinder QuickUpload command.
                                            uploadUrl: '/upload',
                                            filebrowserBrowseUrl:"/files"
                                        },
                                        toolbar: ["selectAll", "undo", "redo", "alignment:left", "alignment:right", "alignment:center", "alignment:justify", "alignment", "fontSize", "fontFamily", "fontColor", "fontBackgroundColor", "bold", "italic", "strikethrough", "underline", "blockQuote", "imageTextAlternative", "link", "ckfinder", "uploadImage", "heading", "imageStyle:full", "imageStyle:alignLeft", "imageStyle:alignRight", "indent", "outdent", "numberedList", "bulletedList", "mediaEmbed", "insertTable", "tableColumn", "tableRow", "mergeTableCells"]
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
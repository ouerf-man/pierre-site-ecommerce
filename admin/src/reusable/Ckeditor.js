import DecoupledDocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document"
import {SimpleUploadAdapter} from "@ckeditor/ckeditor5-upload"

export default class DocumentEditor extends DecoupledDocumentEditor {}

DocumentEditor.builtinPlugins = [
    SimpleUploadAdapter,
]

DocumentEditor.defaultConfig = {
    toolbar: {
        items: [
            'uploadImage',
        ]
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en'
};
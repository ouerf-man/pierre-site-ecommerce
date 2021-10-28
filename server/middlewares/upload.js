const multer = require("multer");
const secrets = require('../utils/secrets')
const MulterAzureStorage = require('multer-azure-storage')


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/bmp': 'bmp',
    'image/webp': 'webp',
    'image/tiff': 'tiff'
};

const filter = (req, file, cb) => {
    if (MIME_TYPE_MAP[file.mimetype]) {
        cb(null, true);
    } else {
        cb("Wrong file type", false);
    }
};

/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "static/assets/images/");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, `${Date.now()}-${name}`);
    },
}); */

const storage = new MulterAzureStorage({
    azureStorageConnectionString: secrets.AZURE_BLOB,
    containerName: secrets.REPORTAGE_CONTAINER,
    containerSecurity: 'blob',
    fileName: (file)=>{return `${Date.now()}-${file.originalname.toLowerCase().split(' ').join('-')}`}
})

const uploadFile = multer({ storage: storage, fileFilter: filter });
module.exports = uploadFile;

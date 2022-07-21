import  * as multer from 'multer';
import * as express from 'express';
import * as mime from  'mime-types';
import {DocumentObject} from "../models/document.models";
import {Api_failure} from "../models/api_models";
import {Document_validators} from "../validators/document_validators";

const maxFileSize = parseInt(process.env.MAX_DOCUMENT_SIZE_ALLOWED ?? "16214400")
const documentCountLimit = parseInt(process.env.DOCUMENT_UPLOAD_LIMIT ?? "10")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  process.env.DOCUMENT_DESTINATION_PATH)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `Document_${Date.now()}${Math.round(Math.random() * 1E9)}`
        cb(null, `${uniqueSuffix}.${mime.extension(file.mimetype)}`)
    }
})

const upload = multer({ storage: storage, limits: {
        fileSize: maxFileSize
    }})

const documentRouter = express.Router();



const uploadConfiguration = upload.array('documents',documentCountLimit);

documentRouter.post('/uploadDocuments',[uploadConfiguration], function (req,res) {
     if(req.files.length != req.fields.length){
         res.send(new Api_failure("Invalid Upload Request", {
                filesLength : req.files.length,
                fieldsLength: req.fields.length
             }
             ,"Document objects & Documents files are not equal"))
     }
     const validatorObject = Document_validators.validateDocumentsRequest(req.fields);
    //TODO("1: Write Document Object DAO")
     //TODO("1 : Insert Documents to document table")
    //TODO("2: Return Success response to api")

     res.send({status : "Document Successfully uploaded"})
})




module.exports = documentRouter;

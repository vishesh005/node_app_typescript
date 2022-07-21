import { validate as uuidValidate } from 'uuid';
import * as path from "path";
import moment = require("moment");

const  INVALID_REQUEST = "Invalid Request";

export class Document_validators {

    static validateDocumentsRequest(documents: any): any{
        if(documents== undefined || !Array.isArray(documents)){
            return [{validation: INVALID_REQUEST, message: `Documents fields are not valid`}];
        }
        const invalidDocumentMessage = [];
        const invalidDocuments = [];

        for(let i = 0; i < documents.length ; i++){
            const message = this.validateSingleDocument(documents[i]);
            if(message != undefined){
                invalidDocumentMessage.push(message);
                message[0].inValidDocument = documents[i];
                invalidDocuments.push(documents[i]);
            }
        }
        const validDocuments = documents.filter((element)=> !invalidDocuments.includes(element));
        return {
            invalidDocuments: invalidDocuments,
            invalidDocumentErrors: invalidDocumentMessage,
            validDocuments: validDocuments
        };
    }

    static validateSingleDocument(document: any): any {
          if(document == undefined || typeof  document != 'object'){
              return [{validation: INVALID_REQUEST, message: `Document is not valid`}];
          }
          else if(document.id == undefined || !uuidValidate(document.id)){
              return [{validation: INVALID_REQUEST, message: `Document id is not valid`}];
          }
          else if(document.name == undefined || document.name.length < 3 || path.extname(document.name) == ''){
              return [{validation: INVALID_REQUEST, message: `Document name is  not valid`}];
          }
          else if(document.created_date == undefined || !moment(document.created_date, "MM/DD/YYYY hh:mm:ss", true).isValid()){
              return [{validation: INVALID_REQUEST, message: `Document creation date is  not valid`}];
          }
          else{
              return undefined;
          }
    }

}

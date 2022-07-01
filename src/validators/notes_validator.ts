import {Note} from "../models/note_model";

const INVALID_REQUEST = "Invalid request";


const message_title =   "Please provide title of the note";
const message_content = "Please provide content of the note";
const message_id = "Please provide note id";

export class Notes_validator {

    validateCreateNoteRequest(request: any): any {
      const notes = {title: message_title, content: message_content};
      const message = this.#getUndefinedMessage(request,notes);
      if(message != undefined){
          return [{validation: INVALID_REQUEST, message: message}];
      }
      if(typeof request.title != "string"){
          return [{validation: INVALID_REQUEST, message: "Please provide valid note title"}];
      }
      if(typeof request.content != "string" || request.content.length < 10){
          return [{validation: INVALID_REQUEST, message: "Content of the note should be in text format and have atleast 10 characters"}];
      }
    }

    #getUndefinedMessage(data:object ,map: object){
        let keys = Object.keys(map);
        for (let i = 0;i< keys.length;i++){
           if(!(keys[i] in data)){
              return map[keys[i]];
           }
        }
    }
}

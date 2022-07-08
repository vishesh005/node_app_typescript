export class UserTable {

   private constructor() {
   }

   static readonly tableName = "users";
   static readonly column_email = "email";
   static readonly column_name = "name";
   static readonly column_age = "age";
   static readonly column_phone_no = "phone_no";
   static readonly column_password = "password";

   static get createQuery() {
      return `CREATE TABLE IF NOT EXISTS ${UserTable.tableName} (`+
          `${UserTable.column_email} TEXT PRIMARY KEY, `+
          `${UserTable.column_name} TEXT, `+
          `${UserTable.column_age} INTEGER, `+
          `${UserTable.column_phone_no} INTEGER, `+
          `${UserTable.column_password} TEXT)`;
   }
}

export class UserAuthTable {

   private constructor() {}

   static readonly column_email = "email";
   static readonly column_name = "name";
   static readonly column_token  = "authToken";

   static readonly tableName = "users_auth";


   static get createQuery() {
      return `CREATE TABLE IF NOT EXISTS ${UserAuthTable.tableName} (`+
          `${UserAuthTable.column_email} TEXT PRIMARY KEY, `+
          `${UserAuthTable.column_name} TEXT, `+
          `${UserAuthTable.column_token} INTEGER, `+
          `FOREIGN KEY (${UserAuthTable.column_email}) `+
          `REFERENCES ${UserTable.tableName} (${UserTable.column_email}))`;
   }

}


export class NotesTable {

   private constructor() {}

   static readonly column_id = "note_id";
   static readonly column_createdBy = "createdBy";
   static readonly column_title= "title";
   static readonly column_content= "content";
   static readonly column_created_datestamp  = "created_at";
   static readonly column_modified_datestamp  = "modified_at";


   static readonly tableName = "notes_table";


   static get createQuery() {
      return `CREATE TABLE IF NOT EXISTS ${NotesTable.tableName} (`+
          `${NotesTable.column_id} TEXT PRIMARY KEY, `+
          `${NotesTable.column_title} TEXT, `+
          `${NotesTable.column_content} TEXT, `+
          `${NotesTable.column_created_datestamp} TEXT, `+
          `${NotesTable.column_modified_datestamp} TEXT, `+
          `${NotesTable.column_createdBy} TEXT, `+
          `FOREIGN KEY (${NotesTable.column_createdBy}) `+
          `REFERENCES ${UserTable.tableName} (${UserTable.column_email}))`;
   }

}



export class  DocumentTable {

   static readonly column_document_id = "document_id";
   static readonly column_mime = "mime_type";
   static readonly column_name = "file_name";
   static readonly column_sizeInKb = "file_size";
   static readonly column_createdDate = "created_date";
   static  readonly column_status = "file_status";
   static  readonly column_by_user = "uploaded_by";

   static readonly tableName = "document_table";


   static get createQuery() {
      return `CREATE TABLE IF NOT EXISTS ${DocumentTable.tableName} `+
              `( ${DocumentTable.column_document_id} TEXT PRIMARY KEY, `+
              `${DocumentTable.column_name} TEXT, `+
              `${DocumentTable.column_mime} TEXT, `+
              `${DocumentTable.column_sizeInKb} TEXT, `+
              `${DocumentTable.column_createdDate} TEXT, `+
              `${DocumentTable.column_status} TEXT`+
              `${DocumentTable.column_by_user} TEXT )`;
   }
}




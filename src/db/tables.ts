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




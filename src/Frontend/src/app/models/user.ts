export class User {
    _id:string;
    name: string;
    email: string;
    password?: string;
    roles_id: string[];
    files_id?: string[];
    post_id?: string[];
  
    constructor(
      name: string="",
      email: string="",
      password?: string,
      files_id: string[] = [],
      roles_id: string[] = [],
      post_id: string[] = [],
      _id:string=""
    ) {
      this.roles_id= roles_id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.files_id = files_id;
      this.post_id = post_id;
      this._id=_id
    }
  }
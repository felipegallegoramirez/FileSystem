export class Rol {
    _id:string;
    name: string;
    users: string[];
  
    constructor(name: string = "", users: string[] = [],_id="") {
      this._id=_id;
      this.name = name;
      this.users = users;
    }
}
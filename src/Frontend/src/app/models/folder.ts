export class Folder {
  _id:string;
  name: string;
  image: string;
  rol: string[];
  users: string[];
  files_id: string[];
  owner: string;

  constructor(
    name: string = "",
    image: string = "",
    rol: string[] = [],
    users: string[] = [],
    files_id: string[] = [],
    owner: string = "",
    _id:string=""
  ) {
    this.name = name;
    this.image = image;
    this.rol = rol;
    this.users = users;
    this.files_id = files_id;
    this.owner = owner;
    this._id=_id
  }
}

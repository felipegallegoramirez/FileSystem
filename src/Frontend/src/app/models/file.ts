export class File {
  _id:string;
  name?: string;
  url?: string;
  owner?: string;

  constructor(
    name: string = "",
    url: string = "",
    owner: string = "",
    id:string=""
  ) {
    this.name = name;
    this.url = url;
    this.owner = owner;
    this._id=id
  }
}
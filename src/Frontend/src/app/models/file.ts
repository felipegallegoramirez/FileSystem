export class File {
  name?: string;
  url?: string;
  owner?: string;

  constructor(
    name: string = "",
    url: string = "",
    owner: string = ""
  ) {
    this.name = name;
    this.url = url;
    this.owner = owner;
  }
}
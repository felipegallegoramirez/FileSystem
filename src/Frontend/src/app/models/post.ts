export class Post {
    title: string;
    description: string;
    images: string[];
    text: string[];
    order: string[];
    owner: string;
  
    constructor(
      title: string = "",
      description: string = "",
      images: string[] = [],
      text: string[] = [],
      order: string[] = [],
      owner: string = ""
    ) {
      this.title = title;
      this.description = description;
      this.images = images;
      this.text = text;
      this.order = order;
      this.owner = owner;
    }
  }
  
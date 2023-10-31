import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Post } from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  selectedPost: Post;
  posts: Post[] = [];
  readonly URL_API = "http://localhost:3000/api/post";
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
    this.selectedPost = new Post();
  }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };


  postPost(post: Post) {
    return this.http.post<Post>(this.URL_API, post,this.httpOptions);
  }

  getPosts() {
    return this.http.get<Post[]>(this.URL_API+``,this.httpOptions);
  }
  getPost(id:string) {
    return this.http.get<Post>(this.URL_API+`/${id}`,this.httpOptions);
  }

  putPost(post: Post,id:string) {
    return this.http.put(this.URL_API+`/${id}`,post,this.httpOptions);
  }

  deletePost(id: string) {
    return this.http.delete(this.URL_API+`/${id}`,this.httpOptions);
  }

  
}
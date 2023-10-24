import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { File } from "../models/file";

@Injectable({
  providedIn: 'root'
})

export class FileService {
  selectedFile: File;
  files: File[] = [];
  readonly URL_API = "http://localhost:3000/api/file";
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
    this.selectedFile = new File();
  }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };


  postFile(file: File) {
    return this.http.post<File>(this.URL_API, file,this.httpOptions);
  }

  getFiles(id:string) {
    return this.http.get<File[]>(this.URL_API+`/${id}`,this.httpOptions);
  }
  getFile(id:string) {
    return this.http.get<File>(this.URL_API+`/${id}`,this.httpOptions);
  }

  putFile(file: File,id:string) {
    return this.http.put(this.URL_API+`/${id}`,file,this.httpOptions);
  }

  deleteFile(id: string) {
    return this.http.delete(this.URL_API+`/${id}`,this.httpOptions);
  }

  
}
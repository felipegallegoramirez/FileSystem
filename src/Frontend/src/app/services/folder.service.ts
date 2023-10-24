import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Folder } from "../models/folder";

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  selectedFolder: Folder;
  folders: Folder[] = [];
  readonly URL_API = "http://localhost:3000/api/folder";
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
    this.selectedFolder = new Folder();
  }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };


  postFolder(folder: Folder) {
    return this.http.post<Folder>(this.URL_API, folder,this.httpOptions);
  }

  getFolders(id:string) {
    return this.http.get<Folder[]>(this.URL_API+`/${id}`,this.httpOptions);
  }
  getFolder(id:string) {
    return this.http.get<Folder>(this.URL_API+`/${id}`,this.httpOptions);
  }

  putFolder(folder: Folder,id:string) {
    return this.http.put(this.URL_API+`/${id}`,folder,this.httpOptions);
  }

  deleteFolder(id: string) {
    return this.http.delete(this.URL_API+`/${id}`,this.httpOptions);
  }

  
}
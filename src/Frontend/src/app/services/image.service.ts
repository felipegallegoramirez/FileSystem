import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly URL_API = "http://localhost:3000/api/image";
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
  }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };


  postImage(file:File) {
    const fd = new FormData();
    fd.append('images', file);
    return this.http.post<any>(this.URL_API, fd,this.httpOptions);
    
  }

  putImage(file:File,id:string) {
    const fd = new FormData();
    fd.append('images', file);
    return this.http.put(this.URL_API+`/${id}`,fd,this.httpOptions);
  }

  deleteImage(id: string) {
    return this.http.delete(this.URL_API+`/${id}`,this.httpOptions);
  }

  
}
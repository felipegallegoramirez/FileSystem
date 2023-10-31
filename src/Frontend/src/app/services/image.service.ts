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
    fd.append('image', file);
    return this.http.post<any>(this.URL_API, fd,this.httpOptions);
  }

  postFile(file:File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<any>(this.URL_API+`/file/`, fd,this.httpOptions);
    
  }

  putImage(file:File,id:string) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.put<any>(this.URL_API+`/${id}`,fd,this.httpOptions);
  }

  deleteImage(id: string) {
    return this.http.delete(this.URL_API+`/${id}`,this.httpOptions);
  }

  postImages(imagenes: Array<File>,) {
    const fd = new FormData();
    for (var i = 0; i <= imagenes.length-1; i++) {
      fd.append('image', imagenes[i]);
    }
    return this.http.post<any>(this.URL_API+`/images/`, fd,this.httpOptions);
  }

  
}
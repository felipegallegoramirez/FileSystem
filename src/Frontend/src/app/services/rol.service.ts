import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { Rol } from "../models/rol";

@Injectable({
  providedIn: 'root'
})
export class RolService {
  selectedRol: Rol;
  rols: Rol[] = [];
  readonly URL_API = "http://localhost:3000/api/rol";
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
    this.selectedRol = new Rol();
  }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })
  };


  postRol(rol: Rol) {
    return this.http.post<Rol>(this.URL_API, rol,this.httpOptions);
  }

  getRols() {
    return this.http.get<Rol[]>(this.URL_API,this.httpOptions);
  }
  getRol(id:string) {
    return this.http.get<Rol>(this.URL_API+`/${id}`,this.httpOptions);
  }

  putRol(rol: Rol,id:string) {
    return this.http.put(this.URL_API+`/${id}`,rol,this.httpOptions);
  }

  deleteRol(id: string) {
    return this.http.delete(this.URL_API+`/${id}`,this.httpOptions);
  }

  
}
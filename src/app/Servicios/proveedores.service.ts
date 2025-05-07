import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private proveedores= 'http://54.174.102.93/api/proveedores';

  constructor(private http: HttpClient ) { }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(this.proveedores);
  }


}

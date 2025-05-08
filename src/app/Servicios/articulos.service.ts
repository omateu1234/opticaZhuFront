import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Optica } from '../interfaces/optica.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {


  private apiurl = 'http://127.0.0.1:8000/api/opticas';


  constructor(private http: HttpClient) { }

  retornar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl);
  }

  getAll(){
    return this.http.get(this.apiurl);
  }

}

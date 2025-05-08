import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosRealService {

  private articulos='http://127.0.0.1:8000/api/articulos';

  private buscarArticulo='http://127.0.0.1:8000/api/buscarArticulo';

  private crearArticulo='http://127.0.0.1:8000/api/crearArticulo';

  constructor(private http: HttpClient ) { }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(this.articulos);
  }

  getById(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.buscarArticulo, { params: { id } });
  }

  createArticulo(articulo: any): Observable<any> {
    return this.http.post<any>(this.crearArticulo, articulo);
  }
}

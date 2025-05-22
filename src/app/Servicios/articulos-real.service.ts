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

  private articulosOpti='http://127.0.0.1:8000/api/articulosOptica';

  private editArticulo='http://127.0.0.1:8000/api/actualizarArticulo';

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

  getArticulosByOptica(idOptica: any): Observable<any[]>{
    return this.http.get<any[]>(this.articulosOpti, {params: {idOptica}});
  }

  editarArticulo(articulo: any): Observable<any[]>{
    return this.http.put<any[]>(this.editArticulo, articulo);
  }
}

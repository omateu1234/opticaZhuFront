import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosRealService {

  private articulos='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/articulos';

  private buscarArticulo='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/buscarArticulo';

  private crearArticulo='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/crearArticulo';

  private articulosOpti='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/articulosOptica';

  private editArticulo='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/actualizarArticulo';

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

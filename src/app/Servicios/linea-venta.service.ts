import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineaVentaService {

  private crearLineaVenta='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/insertarLineaVenta';


  constructor(private http: HttpClient ) { }


  createLineaVenta(articulosPost: { articulos: any[]}): Observable<any> {
    return this.http.post<any[]>(this.crearLineaVenta, articulosPost);
  }
}

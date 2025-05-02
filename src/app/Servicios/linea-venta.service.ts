import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineaVentaService {

  private crearLineaVenta='http://127.0.0.1:8000/api/insertarLineaVenta';


  constructor(private http: HttpClient ) { }


  createLineaVenta(lineaVenta: any): Observable<any> {
    return this.http.post<any>(this.crearLineaVenta, lineaVenta);
  }
}

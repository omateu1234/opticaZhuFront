import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private ventas='http://54.174.102.93/api/ventas';

  private crearVenta='http://54.174.102.93/api/crearVenta';


  constructor(private http: HttpClient ) { }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(this.ventas);
  }

  createVenta(venta: any): Observable<any> {
    return this.http.post<any>(this.crearVenta, venta);
  }
}

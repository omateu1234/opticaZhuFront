import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private ventas='http://127.0.0.1:8000/api/ventas';

  private crearVenta='http://127.0.0.1:8000/api/crearVenta';

  private cancelarVenta='http://127.0.0.1:8000/api/cancelarVenta';

  private venOptica='http://127.0.0.1:8000/api/ventasOptica';


  constructor(private http: HttpClient ) { }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(this.ventas);
  }

  createVenta(venta: any): Observable<any> {
    return this.http.post<any>(this.crearVenta, venta);
  }

  cancelVenta(payload: any){
    return this.http.patch(this.cancelarVenta, {params: {payload}});
  }

  ventasOptica(idOptica: any){
    return this.http.get(this.venOptica, {params: {idOptica}});
  }
}

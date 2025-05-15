import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private ventas='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/ventas';

  private crearVenta='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/crearVenta';

  private cancelarVenta='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/cancelarVenta';

  private venOptica='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/ventasOptica';


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

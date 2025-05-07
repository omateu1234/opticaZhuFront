import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private factura='http://54.174.102.93/api/generarFactura';

  private pagarFactura='http://54.174.102.93/api/pagarFactura';


  constructor(private http: HttpClient ) { }

  generarFactura(idVenta:string): Observable<any[]> {
    return this.http.get<any[]>(this.factura, { params: { idVenta } });
  }

  payFactura(factura: any): Observable<any> {
    return this.http.post<any>(this.pagarFactura, factura);
  }

}

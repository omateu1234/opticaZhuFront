import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private factura='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/generarFactura';

  private pagarFactura='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/pagarFactura';


  constructor(private http: HttpClient ) { }

  generarFactura(idVenta:string): Observable<any[]> {
    return this.http.get<any[]>(this.factura, { params: { idVenta } });
  }

  payFactura(factura: any): Observable<any> {
    return this.http.post<any>(this.pagarFactura, factura);
  }

}

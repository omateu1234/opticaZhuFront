import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private apiurl = 'http://optica-1633249365.us-east-1.elb.amazonaws.com/api/empleadosOptica';
  private apibuscarEmpleado = 'http://optica-1633249365.us-east-1.elb.amazonaws.com/api/buscarEmpleadoApi';
  private actualizarEmpleado = 'http://optica-1633249365.us-east-1.elb.amazonaws.com/api/actualizarEmpleadoApi';
  private opticaEmpleado= 'http://optica-1633249365.us-east-1.elb.amazonaws.com/api/opticaEmpleado';


  constructor(private http: HttpClient) { }

  retornar(): Observable <any[]>{
    return this.http.get<any[]>(this.apiurl);
  }

  getEmpleado(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.apibuscarEmpleado, {params: {id}});
  }

  getAll(id: any): Observable<any[]> {
    const idOptica= id ?? 1;  //Si es nulo envia el 1
    return this.http.get<any[]>(this.apiurl, {params: {idOptica}});
  }

  actualizaEmpleado(data:any): Observable<any[]> {
  return this.http.patch<any[]>(this.actualizarEmpleado, {params: {data}});
  }

  opticaEmple(id: any){
      return this.http.get(this.opticaEmpleado, {params:{id}});
  }
}

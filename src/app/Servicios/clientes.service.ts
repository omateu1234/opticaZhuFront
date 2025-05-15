import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientes='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/clientes';

  private buscar='http://optica-1633249365.us-east-1.elb.amazonaws.com/propietario/buscarCli';

  private citasCliente='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/citasCliente';

  private borrarCliente='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/borrarCliente';

  private ventasCliente='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/clienteVentas';

  constructor(private http: HttpClient) { }

  retornar(): Observable<any[]> {
    return this.http.get<any[]>(this.clientes);
  }

  getAll(){
    return this.http.get(this.clientes);
  }

  buscarCli(dni: string): Observable<any[]> {
    return this.http.get<any[]>(this.buscar, { params: { dni } });
  }

  citasCli(id: string): Observable<any[]> {
    return this.http.get<any[]>(this.citasCliente, { params: { id } });
  }

  borrarCli(id: string){
    return this.http.delete(this.borrarCliente, {params: {id}});
  }

  ventasCli(dni: string): Observable<any[]>{
    return this.http.get<any[]>(this.ventasCliente, {params: {dni}});
  }

  /* private data=new BehaviorSubject<any>(null);
  datoActual=this.data.asObservable();

  cambiarData(dataNueva:any){
    this.data.next(dataNueva);
  } */
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientes='http://127.0.0.1:8000/api/clientes';

  private buscar='http://127.0.0.1:8000/propietario/buscarCli';

  private citasCliente='http://127.0.0.1:8000/api/citasCliente';

  private borrarCliente='http://127.0.0.1:8000/api/borrarCliente';

  private ventasCliente='http://127.0.0.1:8000/api/clienteVentas';

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

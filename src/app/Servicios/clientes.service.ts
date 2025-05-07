import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientes='http://54.174.102.93/api/clientes';

  private buscar='http://54.174.102.93/propietario/buscarCli';

  private citasCliente='http://54.174.102.93/api/citasCliente';

  private borrarCliente='http://54.174.102.93/api/borrarCliente';

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

  /* private data=new BehaviorSubject<any>(null);
  datoActual=this.data.asObservable();

  cambiarData(dataNueva:any){
    this.data.next(dataNueva);
  } */
}

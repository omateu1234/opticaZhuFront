import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private fecha:string='';

  private apiurl='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/crearCita';

  //private citas='http://optica-1633249365.us-east-1.elb.amazonaws.com//api/citas';

  private citas='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/citasOptica';

  private citasOcupadas='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/citasOcupadas';

  private borrarCita= 'http://optica-1633249365.us-east-1.elb.amazonaws.com/api/borrarCita';

 /*  private citas: Citas[] = [
    { hora: '08:00', nombre: 'Juan Pérezoso', motivocita: 'Cambio de graduación' },
    { hora: '09:00', nombre: 'María García', motivocita: 'Revisión' },
    { hora: '10:00', nombre: 'Carlos López', motivocita: 'Revisión' },

  ]
 */

  constructor(private http: HttpClient) { }


/*   getCitasList(): Observable<Citas[]> {
    return of(this.citas);
  } */

  retornar(): Observable<any[]> {
    return this.http.get<any[]>(this.citas);
  }

  getAll(id: any): Observable<any[]> {
    const idOptica= id ?? 1;  //Si es nulo envia el 1
    return this.http.get<any[]>(this.citas, {params: {idOptica}} );
  }

  crearCita(cita: any): Observable<any> {
    return this.http.post<any>(this.apiurl, cita);
  }

  citOcupadas(fecha: string): Observable<any> {
    //console.log('fecha', fecha);
    return this.http.get<any>(this.citasOcupadas, {params: {fecha}});
  }

  borrar(id:string){
    return this.http.delete(this.borrarCita, {params:{id}});
  }
}

export interface Citas {
  hora: string;
  nombre: string;
  motivocita: string;
}


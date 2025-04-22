import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VerTodosEmpleadosService {
  /* private apiUrl = 'http://localhost:3000/api/ver-todos-empleados';  */

  /* constructor(private http: HttpClient) { } */

  /* Esto de abajo se comentará cuado se descomente lo de api */
  private verTodosEmpleados: VerTodosEmpleados [] = [
    { dni: '21006147V', nombre: 'Manuel', apellido: 'Garcia', direccion: 'Buena Vista 23', telefono: '610416779', correo: 'manu_manu2@gmail.com', nombreUsuario: 'mangar21' },
    { dni: '45678901W', nombre: 'Marta', apellido: 'Velazquez', direccion: 'Ave del Paraiso 21', telefono: '657894123', correo: 'martvel12@gmail.com', nombreUsuario: 'marvel45' },
    { dni: '98765432X', nombre: 'Carlos', apellido: 'Lopez', direccion: 'Pasaje Baldío 9', telefono: '674145215', correo: 'carlos23_l@gmail.com', nombreUsuario: 'carlop98' }
  ];
  
  

  /* getCitasList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  } */
 
  getVerTodosEmpleadosList(): Observable<VerTodosEmpleados[]> {
    return of(this.verTodosEmpleados);
  }
}

export interface VerTodosEmpleados {
  nombre: string;
  apellido: string;
  dni: string;
  direccion: string;
  telefono: string;
  correo: string;
  nombreUsuario: string;

}


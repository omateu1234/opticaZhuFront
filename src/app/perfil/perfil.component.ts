import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { EmpleadosService } from '../Servicios/empleados.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  idEmpleado: any;
  empleado: any = [];
  nombreEmpleado:string = localStorage.getItem('nombreEmpleado') || '';
  nombre:string = localStorage.getItem('nombre') || '';
  apellido:string = localStorage.getItem('apellido') || '';
  rol:string = localStorage.getItem('rolUser') || '';
  direccion:string = localStorage.getItem('direccion') || '';
  dni:string = localStorage.getItem('dni') || '';
  telefono:string = localStorage.getItem('telefono') || '';
  correo:string = localStorage.getItem('correo') || '';
  

  constructor(private location: Location,private empleadosService: EmpleadosService) { }
  ngOnInit(): void {
    this.idEmpleado = localStorage.getItem('idEmpleado');
    
    this.empleadosService.actualizaEmpleado(this.idEmpleado).subscribe((data: any) => {
      this.empleado = data;
    });
    console.log(this.nombre);
  }




  atras(): void {
    this.location.back();

  }

  modifica(){
    
  }

  /* actualizaEmpleado(){
    
  } */
}

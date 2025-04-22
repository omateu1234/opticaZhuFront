
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { EmpleadosService } from '../Servicios/empleados.service';
import { ClientesService } from '../Servicios/clientes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLink, CommonModule, DataTablesModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
idEmpleado: any;
  empleado: any = [];
  nombreEmpleado:string = localStorage.getItem('nombreEmpleado') || '';
  rol:string = localStorage.getItem('rolUser') || '';
  

  constructor(private empleadosService: EmpleadosService, private clientesService:ClientesService, private router:Router) { }

  dni: string= '';
  cliente: any;


  ngOnInit(): void {
    this.idEmpleado = localStorage.getItem('idEmpleado');
    
    this.empleadosService.getEmpleado(this.idEmpleado).subscribe((data: any) => {
      this.empleado = data;
      //this.nombreEmpleado = this.empleado.nombre;
      //console.log(data);
    });
    console.log(this.nombreEmpleado);
  }
  title = 'menuProyecto';
  toggleDropdown(event: Event): void {
    const dropdown = (event.target as HTMLElement).nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      dropdown.classList.toggle('visible');
    }
  }

  cerrarSesion(){
    localStorage.clear();
  }

  buscarCliente(){
    localStorage.setItem('dni', this.dni);
    this.clientesService.buscarCli(this.dni).subscribe((data: any) => {
      //console.log(data);
      this.cliente = data;

      localStorage.setItem('idCli', this.cliente.id);
      localStorage.setItem('dniCli', this.cliente.dni);
      localStorage.setItem('nombreCli', this.cliente.nombre);
      localStorage.setItem('apellidoCli', this.cliente.apellido);
      localStorage.setItem('postalCli', this.cliente.codPostal);
      localStorage.setItem('telefonoCli', this.cliente.telefono);
    
      location.href='clientes/perfil-cliente/';
    })
  }
}

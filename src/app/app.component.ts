import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { EmpleadosService } from './Servicios/empleados.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' 
})


export class AppComponent implements OnInit {
  idEmpleado: any;
  empleado: any = [];
  nombreEmpleado:string = localStorage.getItem('nombreEmpleado') || '';
  

  constructor(private empleadosService: EmpleadosService) { }
  ngOnInit(): void {
    this.idEmpleado = localStorage.getItem('idEmpleado');
    
    this.empleadosService.getEmpleado(this.idEmpleado).subscribe((data: any) => {
      this.empleado = data;
      this.nombreEmpleado = this.empleado.nombre;
      //console.log(data);
    });
    //console.log(this.nombreEmpleado);
  }
  title = 'menuProyecto';
  toggleDropdown(event: Event): void {
    const dropdown = (event.target as HTMLElement).nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      dropdown.classList.toggle('visible');
    }
  }


}
//

import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { error } from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-empleado',
  imports: [RouterOutlet, RouterLink,CommonModule, FormsModule],
  templateUrl: './perfil-empleado.component.html',
  styleUrl: './perfil-empleado.component.css'
})
export class PerfilEmpleadoComponent implements OnInit {

  nombreEmpleado: string = '';
  apellidoEmpleado: string = '';
  dniEmpleado: string = '';
  direccionEmpleado: string = '';
  telefonoEmpleado: string = '';
  correoEmpleado: string = '';
  nombreUsuario: string = '';
  rolEmpleado: string = '';
  contraseniaEmpleado: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.nombreEmpleado=localStorage.getItem('nombreEmp') as string;
    this.apellidoEmpleado=localStorage.getItem('apellidoEmp') as string;
    this.dniEmpleado=localStorage.getItem('dniEmp') as string;
    this.direccionEmpleado=localStorage.getItem('direccionEmp') as string;
    this.telefonoEmpleado=localStorage.getItem('telefonoEmp') as string;
    this.correoEmpleado=localStorage.getItem('correoEmp') as string;
    this.nombreUsuario=localStorage.getItem('nombreUsuarioEmp') as string;
    this.rolEmpleado=localStorage.getItem('rolEmp') as string;
    this.contraseniaEmpleado=localStorage.getItem('contraseniaEmp') as string;
  }
}

import { PerfilEmpleadoComponent } from './../perfil-empleado/perfil-empleado.component';

import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import DataTables, { Config } from 'datatables.net';
import { EmpleadosService } from '../../Servicios/empleados.service';
import { AfterViewInit } from '@angular/core';

declare const $: any; // Usando jQuery



@Component({
  selector: 'app-ver-todos-empleados',
  imports: [CommonModule, DataTablesModule, RouterOutlet, RouterLink],
  templateUrl: './ver-todos.component.html',
  styleUrl: './ver-todos.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})

export class VerTodosEmpleadosComponent implements OnInit {

  dtOptions: Config = {};
  empleados: any=[];
  idOptica=localStorage.getItem('idOptica') ?? 1 //Si es nulo envía el 1;

  empleadoSeleccionado: any;

  constructor(private empleadosService: EmpleadosService, private renderer: Renderer2) { }

  /* constructor(
    private todosEmpleadosService: VerTodosEmpleadosService,
    private router: Router,
    private renderer: Renderer2
  ){} */

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback: (data: any) => void) => {
        this.empleadosService.getAll(this.idOptica).subscribe((resp: any) => {
          this.empleados = resp;
          console.log(this.empleados);
          callback({
            recordsTotal: resp.length, // Número total de empleados
            recordsFiltered: resp.length, // Número de empleados filtrados (puedes aplicar filtros si los tienes)
            data: resp // Aquí pasas los datos de los empleados obtenidos
          });
        });
      },
      lengthMenu: [5, 10, 20, 50],
      language: {
        url: '//cdn.datatables.net/plug-ins/2.2.2/i18n/es-ES.json',
      },
      searching: true,
      columns: [
        { title: 'ID', data: 'id', visible: false },            // Coincide con la propiedad 'id' en los objetos
        { title: 'DNI', data: 'dni' },          // Coincide con la propiedad 'dni' en los objetos
        { title: 'Nombre', data: 'nombre' },     // Coincide con la propiedad 'nombre'
        { title: 'Apellido', data: 'apellido' }, // Coincide con la propiedad 'apellido'
        { title: 'Dirección', data: 'direccion' }, // Coincide con la propiedad 'direccion'
        { title: 'Teléfono', data: 'telefono' },  // Coincide con la propiedad 'telefono'
        { title: 'Correo', data: 'correo' },     // Coincide con la propiedad 'correo'
        { title: 'Nombre de Usuario', data: 'nombreUsuario' }
        /* {
          title: 'Actions',
          data: null,
          render: (data: any, type: any, row: any) => {
            return `<div>
                      <button class="btn btn-primary action-btn">View</button>
                    </div>`;
          },
          className: 'action-column'
        } */
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        // Cast row to HTMLElement to access querySelector
        //const rowElement = row as HTMLElement;
        const rowElement = row as HTMLElement;
        // Ensure the last cell (Actions column) is styled

        this.renderer.listen(rowElement, 'click', () => {
          //console.log('Datos de la fila:', data); // Imprime los datos de la fila clicada en la consola.
          this.accederPerfilEmpleado(data);
          //this.empleadoSeleccionado = data;
          //console.log('Datos de la fila:', this.empleadoSeleccionado);

        });

        return row;
      }

      /* const actionCell = rowElement.querySelector('tr:last-child');
      if (actionCell) {
        actionCell.setAttribute(
          'style',
          'border-bottom:1px solid red; '
        );
      } */

      // Find the button in the row and attach a click listener using Renderer2
      /* const actionButton = rowElement.querySelector('.action-btn');
      if (actionButton) {
        this.renderer.listen(actionButton, 'click', () => {
          console.log('Row data:', data); // Log the data for the clicked row
        });
      } */

    }
  };

  private accederPerfilEmpleado(data: any): void {
    /* localStorage.setItem('empleadoSeleccionado', JSON.stringify(data)); */
    this.empleadoSeleccionado = data;
    //console.log('Datos de la fila:', this.empleadoSeleccionado);

    localStorage.setItem('nombreEmp', this.empleadoSeleccionado.nombre);
    localStorage.setItem('apellidoEmp', this.empleadoSeleccionado.apellido);
    localStorage.setItem('dniEmp', this.empleadoSeleccionado.dni);
    localStorage.setItem('direccionEmp', this.empleadoSeleccionado.direccion);
    localStorage.setItem('telefonoEmp', this.empleadoSeleccionado.telefono);
    localStorage.setItem('correoEmp', this.empleadoSeleccionado.correo);
    localStorage.setItem('nombreUsuarioEmp', this.empleadoSeleccionado.nombreUsuario);
    localStorage.setItem('rolEmp', this.empleadoSeleccionado.rol);
    localStorage.setItem('contraseniaEmp', this.empleadoSeleccionado.contrasenia);

    location.href = 'empleados/perfil-empleado/';

  };
}

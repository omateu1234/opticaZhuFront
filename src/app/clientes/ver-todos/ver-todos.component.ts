
import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import DataTables, { Config } from 'datatables.net';
import { ClientesService } from '../../Servicios/clientes.service';
import { AfterViewInit } from '@angular/core';
declare const $: any; // Usando jQuery


@Component({
  selector: 'app-ver-todos',
  imports: [CommonModule, DataTablesModule],
  standalone: true,
  templateUrl: './ver-todos.component.html',
  styleUrl: './ver-todos.component.css',
  encapsulation: ViewEncapsulation.None

})
export class VerTodosCliComponent  implements OnInit{

  dtOptions: Config = {};
  clientes: any=[];
  clienteSeleccionado: any;

  constructor(private clientesService: ClientesService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback: (data: any) => void) => {
        this.clientesService.getAll().subscribe((resp: any) => {
          this.clientes = resp;
          callback({
            recordsTotal: resp.length, // Número total de empleados
            recordsFiltered: resp.length, // Número de empleados filtrados (puedes aplicar filtros si los tienes)
            data: resp // Aquí pasas los datos de los empleados obtenidos
          });
        });
      },
      lengthMenu : [5,10,20,50],
      searching:true,
      columns: [
        { title: 'ID', data: 'id', visible:false },            // Coincide con la propiedad 'id' en los objetos
        { title: 'DNI', data: 'dni' },          // Coincide con la propiedad 'dni' en los objetos
        { title: 'Nombre', data: 'nombre' },     // Coincide con la propiedad 'nombre'
        { title: 'Apellido', data: 'apellido' }, // Coincide con la propiedad 'apellido'
        { title: 'Código Postal', data: 'codPostal' }, // Coincide con la propiedad 'direccion'
        { title: 'Teléfono', data: 'telefono' }  // Coincide con la propiedad 'telefono'
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
          this.accederPerfilCliente(data);
        });

        return row;
      }
    };  
  }

  private accederPerfilCliente(data:any): void{
    this.clienteSeleccionado=data;

    localStorage.setItem('idCli', this.clienteSeleccionado.id);
    localStorage.setItem('dniCli', this.clienteSeleccionado.dni);
    localStorage.setItem('nombreCli', this.clienteSeleccionado.nombre);
    localStorage.setItem('apellidoCli', this.clienteSeleccionado.apellido);
    localStorage.setItem('postalCli', this.clienteSeleccionado.codPostal);
    localStorage.setItem('telefonoCli', this.clienteSeleccionado.telefono);

      location.href='clientes/perfil-cliente/';
  }


}
//

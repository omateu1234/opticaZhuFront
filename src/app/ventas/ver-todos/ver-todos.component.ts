import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { VentasService } from '../../Servicios/ventas.service';
import DataTables, { Config } from 'datatables.net';

@Component({
  selector: 'app-ver-todos-ventas',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './ver-todos.component.html',
  styleUrl: './ver-todos.component.css'
})
export class VerTodosComponent implements OnInit{

  dtOptions: Config = {};
  ventas: any=[];
  ventaSeleccionada: any;

  constructor(private ventasService: VentasService,private renderer: Renderer2 ){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback: (data: any) => void) => {
        this.ventasService.getAll().subscribe((resp: any) => {
          this.ventas = resp;
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
        { title: 'ID', data: 'id', visible:true },            // Coincide con la propiedad 'id' en los objetos
        { title: 'Fecha', data: 'fecha' },     // Coincide con la propiedad 'nombre'
        { title: 'Estado', data: 'estado' }, // Coincide con la propiedad 'apellido'
        { title: 'Metodo de Pago', data:'metodoPago'},
        { title: 'Cliente',
          data:null,
          render:(data:any, type:any, row:any) =>{
            return `${row.cliente.nombre} ${row.cliente.apellido}`;
          }
         }, // Coincide con la propiedad 'direccion'
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        // Cast row to HTMLElement to access querySelector
        //const rowElement = row as HTMLElement;
        const rowElement = row as HTMLElement;
        // Ensure the last cell (Actions column) is styled

        this.renderer.listen(rowElement, 'click', () => {
          console.log('Datos de la fila:', data); // Imprime los datos de la fila clicada en la consola.
          this.accederPerfilVenta(data);
        });

        return row;
      }
    };
  }

  accederPerfilVenta(data: any){
    this.ventaSeleccionada = data;

    localStorage.setItem('nombreCli', this.ventaSeleccionada.cliente.nombre);
    localStorage.setItem('apellidoCli', this.ventaSeleccionada.cliente.apellido);
    localStorage.setItem('idVenta', this.ventaSeleccionada.id);



    location.href = 'ventas/perfil-venta/';
  }
}

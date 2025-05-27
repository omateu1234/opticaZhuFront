import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { VentasService } from '../../Servicios/ventas.service';
import DataTables, { Config } from 'datatables.net';
import Swal from 'sweetalert2';

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

  idOptica= localStorage.getItem('idOptica');

  constructor(private ventasService: VentasService,private renderer: Renderer2 ){}

  ngOnInit(): void {
    // Suponiendo que la llamada al servicio sea asíncrona, mandamos a buscar los datos
    this.ventasService.ventasOptica(this.idOptica).subscribe((resp: any) => {
      this.ventas = resp;

      // Configuración de DataTable en el lado del cliente
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthMenu: [5, 10, 20, 50],
        searching: true,
        columns: [
          { title: 'ID', data: 'id', visible: true },
          { title: 'Fecha', data: 'fecha' },
          { title: 'Estado', data: 'estado' },
          { title: 'Metodo de Pago', data: 'metodoPago' },
          {
            title: 'Cliente',
            data: null,
            render: (data: any, type: any, row: any) => {
              return `${row.cliente.nombre} ${row.cliente.apellido}`;
            }
          },
        ],
        rowCallback: (row: Node, data: any, index: number) => {
          const rowElement = row as HTMLElement;
          this.renderer.listen(rowElement, 'click', () => {
            console.log('Datos de la fila:', data);
            this.accederPerfilVenta(data);
          });
          return row;
        }
      };
      // Inicializa DataTables con los datos recibidos
      $(document).ready(() => {
        $('#ventasTable').DataTable({
          data: this.ventas, // Aquí pasamos los datos directamente
          columns: this.dtOptions.columns,
          pagingType: this.dtOptions.pagingType,
          pageLength: this.dtOptions.pageLength,
          lengthMenu: this.dtOptions.lengthMenu,
          searching: this.dtOptions.searching,
          rowCallback: this.dtOptions.rowCallback
        });
      });
    });
  }

  /**
   * Metodo para acceder a la información específica de una venta
   * @param data la venta seleccionada por el usario
   */
  accederPerfilVenta(data: any){
    this.ventaSeleccionada = data;

    localStorage.setItem('nombreCli', this.ventaSeleccionada.cliente.nombre);
    localStorage.setItem('apellidoCli', this.ventaSeleccionada.cliente.apellido);
    localStorage.setItem('idVenta', this.ventaSeleccionada.id);


    if(this.ventaSeleccionada.estado=='pendiente'){
      location.href = 'ventas/perfil-venta/';
    }

    if(this.ventaSeleccionada.estado=='cancelado' || this.ventaSeleccionada.estado=='recibido'){
      location.href='ventas/factura';
    }
  }

  /**
   * Un filtro de Ventas
   */
  filtro() {
    Swal.fire({
      title: 'Filtro de Ventas',
      html: `
        <label for="fecha">Fecha</label>
        <input type="date" id="fecha" class="swal2-input" placeholder="Fecha">
        <hr>
        <label for="estado">Estado</label>
        <select id="estado" class="swal2-select">
          <option value="" selected>Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="cancelado">Cancelado</option>
          <option value="recibido">Recibido</option>
        </select>
        <hr>
      `,
      confirmButtonText: 'Filtrar',
      customClass: {
          confirmButton: 'botonNuevaCita'
      },
      preConfirm: () => {
        const fecha = (document.getElementById('fecha') as HTMLInputElement).value;
        const estado = (document.getElementById('estado') as HTMLSelectElement).value;

        console.log("Fecha:", fecha);
        console.log("Estado:", estado);

        return { fecha, estado };
      }
    }).then(result => {
      if (result.isConfirmed) {
        console.log("Datos del filtro:", result.value);
        this.realizarFiltrado(result.value);
      }
    });
  }

  /**
   * Metodo para realiar el filtrado y modificar el dataTable.
   * @param result
   */
  realizarFiltrado(result:any){
    console.log("datos del filtrado", result);

    const tabla= $('#ventasTable').DataTable();

    tabla.columns(1).search(result.fecha || '');
    tabla.columns(2).search(result.estado || '');

    //tabla.clear();
    tabla.draw();
    console.log("filtrado");
  }
}

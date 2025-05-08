import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { ArticulosRealService } from '../../Servicios/articulos-real.service';
import DataTables, { Config } from 'datatables.net';
@Component({
  selector: 'app-ver-todos',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './ver-todos.component.html',
  styleUrl: './ver-todos.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})


export class VerTodosComponent  implements OnInit{

  dtOptions: Config = {};
  articulos: any=[];
  articuloSeleccionado: any;

  constructor(private articulosRealService: ArticulosRealService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback: (data: any) => void) => {
        this.articulosRealService.getAll().subscribe((resp: any) => {
          this.articulos = resp;
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
        { title: 'Nombre', data: 'nombre' },     // Coincide con la propiedad 'nombre'
        { title: 'Descripción', data: 'descripcion' }, // Coincide con la propiedad 'apellido'
        { title: 'Precio', data: 'precioCliente' }, // Coincide con la propiedad 'direccion'
        { title: 'Stock', data: 'stock' }  // Coincide con la propiedad 'telefono'
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        // Cast row to HTMLElement to access querySelector
        const rowElement = row as HTMLElement;
        // Ensure the last cell (Actions column) is styled

        this.renderer.listen(rowElement, 'click', () => {
          console.log('Datos de la fila:', data); // Imprime los datos de la fila clicada en la consola.
          this.accederPerfilArticulo(data);
        });

        return row;
      }
    };
  }

  accederPerfilArticulo(data:any): void{
    this.articuloSeleccionado=data;

    localStorage.setItem('idArt', this.articuloSeleccionado.id);
    localStorage.setItem('nombreArt', this.articuloSeleccionado.nombre);
    localStorage.setItem('descripcionArt', this.articuloSeleccionado.descripcion);
    localStorage.setItem('precioArt', this.articuloSeleccionado.precioCliente);
    localStorage.setItem('stockArt', this.articuloSeleccionado.stock);

    location.href='articulos/perfil-articulo/';

  }
}

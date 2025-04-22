import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { CitasService } from '../Servicios/citas.service';
import { Citas } from '../Servicios/citas.service';
import { AfterViewInit } from '@angular/core';
import { ClientesService } from '../Servicios/clientes.service';
import { FormsModule } from '@angular/forms';

declare const $: any; //En teoria sirve para declarar que estoy usando jQuery

@Component({
  selector: 'app-citas',
  imports: [CommonModule, DataTablesModule,FormsModule, RouterLink, RouterOutlet],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit{

  dtOptions: Config = {};
  cliente: any = '';
  dni: string= '';
  idOptica= localStorage.getItem('idOptica');


  constructor(
    private citasService: CitasService,
    private renderer: Renderer2,
    private clientesService: ClientesService,
    private router: Router
  ){}

  //Funcion para enviar el DNI a fecha
  enviarDNI(){
    //localStorage.clear();
    localStorage.setItem('dni', this.dni);
    this.clientesService.buscarCli(this.dni).subscribe((data: any) => {
      //console.log(data);
      this.cliente = data;
      //console.log(this.cliente);

      //Borrar Modal
      document.querySelector('.modal-backdrop')?.remove();
      document.getElementById('buscarCliModal2')?.classList.remove('show');
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();

      localStorage.setItem('cliente', this.cliente);

      localStorage.setItem('apellido', this.cliente.apellido);
      localStorage.setItem('idCliente', this.cliente.id);
      localStorage.setItem('nombreCliente', this.cliente.nombre);



      this.router.navigate(['/fecha'],{
        //queryParams: {dni: this.cliente.dni}
      });
    })
  }

  ngOnInit(): void {
    //console.log(this.idOptica);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/2.2.2/i18n/es-ES.json',
      },
      ajax: (dataTablesParameters: any, callback: (data: any) => void) => {
        this.citasService.getAll(this.idOptica).subscribe((resp: any) => {
          this.cliente = resp;
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
        { title: 'Fecha', data: 'fecha' },          // Coincide con la propiedad 'dni' en los objetos
        { title: 'Hora', data: 'hora' },     // Coincide con la propiedad 'nombre'
        { title: 'Descripción', data: 'descripcion' }, // Coincide con la propiedad 'apellido'
        //{ title: 'Código Postal', data: 'codPostal' }, // Coincide con la propiedad 'direccion'
        //{ title: 'Teléfono', data: 'telefono' }  // Coincide con la propiedad 'telefono'
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

        /* this.renderer.listen(rowElement, 'click', () => {
          //console.log('Datos de la fila:', data); // Imprime los datos de la fila clicada en la consola.
          this.accederPerfilEmpleado(data);

        }); */

        return row;
      }
    };
  }

}

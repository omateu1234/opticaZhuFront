import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../../Servicios/clientes.service';
import { DataTablesModule } from 'angular-datatables';
import DataTables, { Config } from 'datatables.net';


@Component({
  selector: 'app-ventas',
  imports: [CommonModule, FormsModule, DataTablesModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  dtOptions: Config = {};


  constructor(private router:Router, private clientesService: ClientesService, private renderer: Renderer2){}

  dni:string=''
  ventasCli:any=[];
  ventaSeleccionada: any;

  cliente:any=[];

  nombreCli:string='';
  apellidoCli:string='';

  ngOnInit(): void {
    this.dni=localStorage.getItem('dni')as string;

    this.buscarCliente();

    //this.ventasCliente();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback: (data: any) => void) => {
        const buscar = dataTablesParameters.search.value;
        console.log("algo",buscar);
        this.clientesService.ventasCli(this.dni).subscribe((resp: any) => {
          this.ventasCli = resp;
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
         // Coincide con la propiedad 'direccion'
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

  buscarCliente(){
    this.clientesService.buscarCli(this.dni).subscribe({
      next: (data: any) => {
        this.cliente=data;
        this.nombreCli=this.cliente.nombre;
        this.apellidoCli=this.cliente.apellido;
        //localStorage.setItem('nombreCli',this.cliente.nombre);

        console.log(this.cliente);
        //alert(this.citasCliente);
      }
    });
  }


  ventasCliente(){
    this.clientesService.ventasCli(this.dni).subscribe({
      next: (data: any) => {
        this.ventasCli=data;
        localStorage.setItem('idVenta',this.ventasCli.id);
        console.log(this.ventasCli);
        //alert(this.citasCliente);
      }
    });
  }

  accederPerfilVenta(data: any){
    this.ventaSeleccionada = data;

    localStorage.setItem('nombreCli', this.nombreCli);
    localStorage.setItem('apellidoCli', this.apellidoCli);
    localStorage.setItem('idVenta', this.ventaSeleccionada.id);



    location.href = 'ventas/perfil-venta/';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FacturaService } from '../../Servicios/factura.service';


@Component({
  selector: 'app-factura',
  imports: [CommonModule, FormsModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit {


  datosFactura:any=[];

  /**Datos Factura */
  fecha:string='';
  estadoPago:string='';
  idVenta: string='';


  constructor(private router:Router, private facturaService:FacturaService){}

  ngOnInit(): void {
    this.idVenta=localStorage.getItem('idVenta') as string;
    this.estadoPago='pagado';

    this.generarFactura(this.idVenta);
    //console.log(this.datosFactura);


  }

  generarFactura(idVenta:string){
    this.facturaService.generarFactura(idVenta).subscribe({
      next: (data: any) => {
        this.datosFactura=data;
        this.fecha = new Date(this.datosFactura.fecha).toISOString().split('T')[0];
        console.log("fecha:" ,this.fecha);
        console.log(this.datosFactura);
      }
    });
  }

  pagarFactura(){
    const factura={
      fecha:this.fecha,
      estadoPago:this.estadoPago,
      idVenta:this.idVenta
    }
    this.facturaService.payFactura(factura).subscribe({
      next: (data: any) => {
          console.log(data);
          this.router.navigate(['/ventas/ver-todos']);
      },
      error: (e) => {
        console.log(e);
      }
    });
    console.log(factura);
  }
}

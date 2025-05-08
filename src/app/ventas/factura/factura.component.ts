import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FacturaService } from '../../Servicios/factura.service';
import { jsPDF} from 'jspdf';
import  html2canvas  from 'html2canvas';


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
          this.generarPdf();
          this.router.navigate(['/ventas/ver-todos']);
      },
      error: (e) => {
        console.log(e);
      }
    });
    console.log(factura);

  }

  generarPdf(): void{
    const DATA: HTMLElement = document.getElementById('factura') as HTMLElement; // Selecciona el contenedor de la factura
    const doc = new jsPDF('p', 'mm', 'a4'); // Crea un documento PDF en formato A4
    const options = {
      scale: 2 // Escala para mejorar la calidad de la captura
    };

    html2canvas(DATA, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convierte el canvas a una imagen en formato PNG
      console.log(DATA);
      const imgWidth = 190; // Ancho de la imagen en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula la altura proporcional de la imagen
      const position = 10; // Margen superior

      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight); // Agrega la imagen al PDF
      doc.save(`Factura_${this.idVenta}.pdf`); // Guarda el archivo PDF con un nombre dinámico
    });
  }
}

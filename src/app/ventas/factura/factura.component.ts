import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FacturaService } from '../../Servicios/factura.service';
import { jsPDF} from 'jspdf';
import  html2canvas  from 'html2canvas';
import { ignoreElements } from 'rxjs';
import { element } from 'angular';


@Component({
  selector: 'app-factura',
  imports: [CommonModule, FormsModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit {


  datosFactura:any=[];
  numeroFactura: string='';

  /**Datos Factura */
  fecha:string='';
  estadoPago:string='';
  idVenta: string='';

  iban:string='';
  tarjeta:string='';
  caducidad:string='';
  cvc:string='';



  constructor(private router:Router, private facturaService:FacturaService){}

  ngOnInit(): void {
    this.idVenta=localStorage.getItem('idVenta') as string;
    this.estadoPago='pagado';




    this.generarFactura(this.idVenta);
    //console.log(this.datosFactura);

    const fecha = new Date();
    const idVenta = this.idVenta || '0000'; // Usa el ID de la venta o un valor predeterminado
    this.numeroFactura = `FAC-${fecha.getFullYear()}${(fecha.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}-${idVenta}`;

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

  comprobarIban(){
    const ibanPattern = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
    if (this.iban.match(ibanPattern)) {
      console.log('IBAN válido:', this.iban);
      // Aquí puedes proceder con la lógica que se requiere si el IBAN es válido
      this.pagarFactura();
    } else {
     alert('IBAN no válido');
      // Lógica alternativa si el IBAN no es válido
    }
  }

  comprobarTarjeta(){
    const tarjetaPattern=/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35[0-9]{3})[0-9]{11})$/;

    const caducidadPattern=/^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const cvcPattern=/[0-9]{3,4}$/;

    if(this.tarjeta.match(tarjetaPattern) && this.caducidad.match(caducidadPattern) && this.cvc.match(cvcPattern)){
      this.pagarFactura();
    }else{
      console.log(this.tarjeta);
      alert("Tarjeta no Válida");
    }
  }

  pagarFactura(){
    const factura={
      fecha:this.fecha,
      estadoPago:this.estadoPago,
      idVenta:this.idVenta,
    }
    this.facturaService.payFactura(factura).subscribe({
      next: (data: any) => {
          console.log(data);
           //Borrar Modal
           document.querySelector('.modal-backdrop')?.remove();
           document.getElementById('crearVenModal')?.classList.remove('show');
           document.body.classList.remove('modal-open');
           document.querySelector('.modal-backdrop')?.remove();
           this.router.navigate(['/clientes/ventas-cliente']);
          this.generarPdf();
          this.router.navigate(['/ventas/ver-todos']);
      },
      error: (e) => {
        console.log(e);
      }
    });
    console.log(factura);
    //localStorage.clear();
  }

  generarPdf(): void{
    const DATA: HTMLElement = document.getElementById('factura') as HTMLElement; // Selecciona el contenedor de la factura
    const doc = new jsPDF('p', 'mm', 'a4'); // Crea un documento PDF en formato A4
    const options = {
      scale: 2 // Escala para mejorar la calidad de la captura
    };

    html2canvas(DATA, {ignoreElements: (element) => {
      return element.classList.contains('cerrar') || element.classList.contains('botonNuevaCita') || element.classList.contains('modal');
    }}).then((canvas) => {
      const imgData = canvas.toDataURL('image/svg'); // Convierte el canvas a una imagen en formato PNG
      console.log(DATA);
      const imgWidth = 190; // Ancho de la imagen en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula la altura proporcional de la imagen
      const position = 10; // Margen superior

      doc.addImage(imgData, 'SVG', 10, position, imgWidth, imgHeight); // Agrega la imagen al PDF
      doc.save(`${this.numeroFactura}.pdf`); // Guarda el archivo PDF con un nombre dinámico
    });
  }
}

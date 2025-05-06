import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticulosRealService } from '../../Servicios/articulos-real.service';
import { LineaVentaService } from '../../Servicios/linea-venta.service';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-perfil-venta',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-venta.component.html',
  styleUrl: './perfil-venta.component.css'
})
export class PerfilVentaComponent implements OnInit{

  nombreCli:string='';
  apellidoCli:string='';
  articulosVenta:any[]=[];

  /**Formulario linea venta */
  cantidad:number=0;
  precio_unitario:number=0;
  importe:number=0;
  idVenta:string='';
  idArticulo:string='';

  articulo: any;

  constructor(private router:Router, private articulosRealService: ArticulosRealService, private lineaVentaService: LineaVentaService){}

  ngOnInit(): void {
    this.idVenta=localStorage.getItem('idVenta') as string;
    this.nombreCli=localStorage.getItem('nombreCli')as string;
    this.apellidoCli=localStorage.getItem('apellidoCli')as string;

    this.articulosRealService.getAll().subscribe({
      next: (data: any) => {
        this.articulosVenta = data.map((articulo: any) => ({
          ...articulo,
          cantidad: 0
        }));
      }
    });
  }


  incrementarCantidad(articulo: any): void {
    if (articulo.cantidad < articulo.stock) {
      articulo.cantidad++;
    }
  }

  decrementarCantidad(articulo: any): void {
    if (articulo.cantidad > 0) {
      articulo.cantidad--;
    }
  }

  calcularImporte(articulo: any): number {
    return articulo.cantidad * articulo.precioCliente;
  }

  crearLineaventa(): void{
    const articulos = this.articulosVenta
    .filter(art => art.cantidad && art.cantidad > 0)
    .map(art => ({
      cantidad: art.cantidad,
      precio_unitario: art.precioCliente,
      importe: this.calcularImporte(art),
      idVenta: this.idVenta,
      idArticulo: art.id
    }));

    const articulosPost={
      articulos: articulos
    }

    console.log(articulos);

    this.lineaVentaService.createLineaVenta(articulosPost).subscribe({
      next: (data: any) => {
          console.log(data);
          console.log(articulosPost);
          this.router.navigate(['/ventas/factura']);
      },
      error: (e) => {
        console.log(e);
      }
    })

  }

}

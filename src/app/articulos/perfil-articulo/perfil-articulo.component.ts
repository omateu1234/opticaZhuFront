import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArticulosRealService } from '../../Servicios/articulos-real.service';

@Component({
  selector: 'app-perfil-articulo',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-articulo.component.html',
  styleUrl: './perfil-articulo.component.css'
})
export class PerfilArticuloComponent implements OnInit{

  idArt:string='';
  nombreArt:string='';
  descripcionArt:string='';
  precioArt:string='';
  stockArt:string='';

  constructor(private router:Router, private articulosRealService: ArticulosRealService){}

  ngOnInit(): void {

    this.idArt=localStorage.getItem('idArt') as string;
    this.nombreArt=localStorage.getItem('nombreArt') as string;
    this.descripcionArt=localStorage.getItem('descripcionArt') as string;
    this.precioArt=localStorage.getItem('precioArt') as string;
    this.stockArt=localStorage.getItem('stockArt') as string;

  }

  /**
   * Metodo para editar los datos de un artículo
   */
  editarArticulo(){
    const articulo=[
      { key: 'id', value: this.idArt },
      { key: 'nombre', value: this.nombreArt },
      { key: 'descripcion', value: this.descripcionArt },
      { key: 'precioProveedor', value: this.precioArt },
      { key: 'stock', value: this.stockArt }
    ];

    alert("articulo"+articulo);
      this.articulosRealService.editarArticulo(articulo).subscribe({
        next: (data: any) => {
            console.log(data);
            console.log("articulo",articulo);
            //window.location.reload();
        },
        error: (e) => {
          console.log(e);
        }
      });
       //Borrar Modal
       document.querySelector('.modal-backdrop')?.remove();
       document.getElementById('editArtModal')?.classList.remove('show');
       document.body.classList.remove('modal-open');
       document.querySelector('.modal-backdrop')?.remove();

  }

}

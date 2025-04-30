import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-articulo',
  imports: [CommonModule],
  templateUrl: './perfil-articulo.component.html',
  styleUrl: './perfil-articulo.component.css'
})
export class PerfilArticuloComponent implements OnInit{

  idArt:string='';
  nombreArt:string='';
  descripcionArt:string='';
  precioArt:string='';
  stockArt:string='';

  constructor(private router:Router){}

  ngOnInit(): void {

    this.idArt=localStorage.getItem('idArt') as string;
    this.nombreArt=localStorage.getItem('nombreArt') as string;
    this.descripcionArt=localStorage.getItem('descripcionArt') as string;
    this.precioArt=localStorage.getItem('precioArt') as string;
    this.stockArt=localStorage.getItem('stockArt') as string;

  }

}

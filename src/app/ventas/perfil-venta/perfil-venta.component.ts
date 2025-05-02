import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-venta',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-venta.component.html',
  styleUrl: './perfil-venta.component.css'
})
export class PerfilVentaComponent implements OnInit{


  constructor(private router:Router){}

  ngOnInit(): void {
      
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticulosService } from '../Servicios/articulos.service';
import { CommonModule } from '@angular/common';
//import { Optica } from '../interfaces/optica.interface';

@Component({
  selector: 'app-opticas',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './opticas.component.html',
  styleUrls: ['./opticas.component.css']
})
export class OpticasComponent {

  articulos: any;

  constructor(private articulosService: ArticulosService) {
    this.articulosService.getAll().subscribe(result => this.articulos = result);
  }

 /*  ngOnInit(): void {
    this.articulosService.retornar().subscribe((data: Optica[]) => {
      this.articulos = data;
      this.generateTable();
    });
  }

  ngAfterViewInit(): void {
    this.generateTable();
  }

  generateTable(): void {
    const tableBody = document.getElementById('table-body');
    if (tableBody) {
      tableBody.innerHTML = ''; // Clear existing content
      this.articulos.forEach(art => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${art.id}</td>
          <td>${art.nombre}</td>
          <td>${art.direccion}</td>
          <td>hola</td>
        `;
        tableBody.appendChild(row);
      });
    }
  }
 */
  /* trackById(index: number, item: Optica): number {
    return item.id;
  } */

}

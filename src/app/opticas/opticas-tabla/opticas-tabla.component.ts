import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticulosService } from '../../Servicios/articulos.service';

@Component({
  selector: 'app-opticas-tabla',
  imports: [RouterOutlet],
  templateUrl: './opticas-tabla.component.html',
  styleUrl: './opticas-tabla.component.css'
})
export class OpticasTablaComponent {
    articulos: any;

    constructor(private articulosService: ArticulosService){
      this.articulosService.retornar().
        subscribe(result=> this.articulos=result)
    }
}

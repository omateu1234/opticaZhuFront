import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ClientesService } from '../Servicios/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasService } from '../Servicios/citas.service';
import { error } from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fecha',
  standalone:true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './fecha.component.html',
  styleUrl: './fecha.component.css'
})
export class FechaComponent  implements OnInit{
  cliente: any = [];
  dni: string= '';
  idCliente: string = '';
  idOptica= localStorage.getItem('idOptica') ?? 1;


  fecha: string = '';
  descripcion: string = '';
  horas: { hora: string, inicio: string, fin: string, value: string, ocupado:boolean }[] = [];
  horaSeleccionada: string = '';

  citasOcup: any[] = [];

  nombreCliente: string = '';
  apellidoCliente: string = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private citaSerivce: CitasService) { }

              
  ngOnInit(): void {
    //Aqui se recoge el dni del cliente que proviene de la pagina de citas, tambien recoge la fecha de la cita

    console.log("fecha",this.fecha);

    this.route.queryParams.subscribe(params => {
      //this.dni = params['dni'];
//      this.fecha = params['fecha'];
      this.fecha=localStorage.getItem('fecha') as string;
      console.log("fecha enviada",this.fecha);

        this.dni=localStorage.getItem('dni') as string;
        console.log("dni enviado",this.dni);

      this.cliente=localStorage.getItem('cliente') as string;
      console.log("cliente enviado",this.cliente);

      this.idCliente=localStorage.getItem('idCliente') as string;
      console.log("id enviado",this.idCliente);

      this.apellidoCliente=localStorage.getItem('apellido') as string;
      console.log("apellido enviado",this.apellidoCliente);

      this.nombreCliente=localStorage.getItem('nombreCliente') as string;
      console.log("nombre enviado",this.nombreCliente);

      console.log('Optica', this.idOptica);


      if (!this.cliente || this.nombreCliente== 'undefined') {
        alert('Cliente no encontrado');
        localStorage.clear();
        this.router.navigate(['/citas']); // Redirige al componente CitasComponent
      }

      console.log(this.cliente);
    });
    console.log(this.fecha);


      this.citasOcupadas();

      //this.generarHorasCita();
  }

  generarHorasCita(){
    const horaInicio=10;
    const horaFin=20;

    for(let i=horaInicio;i<=horaFin;i++){
      const hora = i + ":00:00";
      let ocupado = false;

      for (let cita of this.citasOcup) {
        console.log(cita.hora);
        if(cita.hora === hora){
          ocupado = true;
          //alert('ocupada');
          break;
        }
      }
      this.horas.push({ hora: i+":00", inicio: i+":00", fin: i+":30", value: i+":00", ocupado });

    }
  }

  seleccionarHora(hora: string): void {
    this.horaSeleccionada=hora;
  }

  crearCita(){
    const cita = {
      fecha: this.fecha,
      hora: this.horaSeleccionada,
      descripcion: this.descripcion,
      idCliente: this.idCliente,
      idOptica: this.idOptica,
    }

    this.citaSerivce.crearCita(cita).subscribe({
      next: (data: any) => {
          console.log(data);
          this.router.navigate(['/citas']);
          localStorage.removeItem('dni');
          localStorage.removeItem('cliente');
          localStorage.removeItem('apellidoCliente');
          localStorage.removeItem('idCliente');
          localStorage.removeItem('nombreCliente');
          localStorage.removeItem('fecha');
      },
      error: (e) => {
        console.log(e);
      }
    });
    console.log(cita);
  }

  citasOcupadas(): void {
    //console.log("fecha enviada",this.fechaDate);
    this.citaSerivce.citOcupadas(this.fecha).subscribe({
      next: (data: any) => {
        this.citasOcup = data;
        console.log(this.citasOcup);
        this.generarHorasCita();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../Servicios/clientes.service';
import { CitasService } from '../../Servicios/citas.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { htmlPrefilter } from 'jquery';
@Component({
  selector: 'app-cliente-perfil',
  imports: [CommonModule],
  templateUrl: './cliente-perfil.component.html',
  styleUrl: './cliente-perfil.component.css'
})
export class ClientePerfilComponent implements OnInit {


  idCli: string = '';
  dniCli: string = '';
  nombreCli: string = '';
  apellidoCli: string = '';
  telefonoCli: string = '';
  postalCli: string = '';

  idCita:string='';

  citasCliente: any='';

  constructor(private clienteService:ClientesService, private router:Router, private citaService:CitasService) {}

  ngOnInit(): void {



    this.idCli=localStorage.getItem('idCli') as string;
    this.dniCli=localStorage.getItem('dniCli')as string;
    this.nombreCli=localStorage.getItem('nombreCli') as string;
    this.apellidoCli=localStorage.getItem('apellidoCli') as string;
    this.telefonoCli=localStorage.getItem('telefonoCli') as string;
    this.postalCli=localStorage.getItem('postalCli') as string;

    this.citasCli();
    //this.idCita=localStorage.getItem('idCita',) as string;
    //console.log('cita seleccionada', this.idCita);
  }

  private citasCli(): void{
    this.clienteService.citasCli(this.idCli).subscribe({
      next: (data: any) => {
        this.citasCliente=data;
        localStorage.setItem('idCita',this.citasCliente.id);
        console.log(this.citasCliente);
        //alert(this.citasCliente);
      }
    })
  }

  seleccionarCita(id:string){
    this.idCita=id;
    localStorage.setItem('idCita', this.idCita);
    console.log(this.idCita);
  }

  borrarCli(): void{
    this.clienteService.borrarCli(this.idCli).subscribe({
      next: ()=>{
        document.querySelector('.modal-backdrop')?.remove();
      document.getElementById('borrarCliModal')?.classList.remove('show');
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
        //alert('Cliente Borrado');

        Swal.fire({
          icon: "success",
          width: 400,
          iconColor:'#176E63',
          color: '#176E63',
          background: '#9FF0DA',
          titleText: "Cliente eliminado",
          showConfirmButton: false,
          timer: 1500,
      });
      localStorage.clear();
        this.router.navigate(['/citas']);
      }
    })
  }

  borrarCita(): void{
    this.citaService.borrar(this.idCita).subscribe({
      next: ()=>{
        document.querySelector('.modal-backdrop')?.remove();
        document.getElementById('borrarCitaModal')?.classList.remove('show');
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop')?.remove();
          //alert('Cliente Borrado');

          Swal.fire({
            icon: "success",
            width: 400,
            iconColor:'#176E63',
            color: '#176E63',
            background: '#9FF0DA',
            titleText: "Cita eliminada",
            showConfirmButton: false,
            timer: 1500,
        });
        location.reload();
      }
    })
  }

  cerrarModalCliente(): void{
    document.querySelector('.modal-backdrop')?.remove();
    document.getElementById('borrarCliModal')?.classList.remove('show');
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop')?.remove();
  }

  cerrarModalCita():void{
    document.querySelector('.modal-backdrop')?.remove();
    document.getElementById('borrarCitaModal')?.classList.remove('show');
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop')?.remove();
  }

}

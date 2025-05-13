
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { EmpleadosService } from '../Servicios/empleados.service';
import { ClientesService } from '../Servicios/clientes.service';
import { ArticulosRealService } from '../Servicios/articulos-real.service';
import { ProveedoresService } from '../Servicios/proveedores.service';
import { VentasService } from '../Servicios/ventas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLink, CommonModule, DataTablesModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
idEmpleado: any;
  empleado: any = [];
  nombreEmpleado:string = localStorage.getItem('nombreEmpleado') || '';
  rol:string = localStorage.getItem('rolUser') || '';
  idOptica= localStorage.getItem('idOptica');

  optica:any={};


  constructor(private empleadosService: EmpleadosService,
              private clientesService:ClientesService,
              private articulosRealService: ArticulosRealService ,
              private ventasService: VentasService,
              private proveedoresService: ProveedoresService,
              private router:Router) { }

  dni: string= '';
  idArticulo: string= '';
  articulo: any;
  cliente: any;
  proveedores: any=[];

  /**Formulario Articulo */
  nombre:string='';
  descripcion:string='';
  precioProveedor: number=0;
  idProveedor:string='';
  /************************** */

  /**Formulario Venta */
  fecha:string='';
  metodoPago:string='';
  dniCliente:string='';


  ngOnInit(): void {
    this.idEmpleado = localStorage.getItem('idEmpleado');

    this.empleadosService.getEmpleado(this.idEmpleado).subscribe((data: any) => {
      this.empleado = data;
      //this.nombreEmpleado = this.empleado.nombre;
      console.log("empleado",this.empleado);
    });

    this.conseguirProveedores();

    console.log(this.nombreEmpleado);
    console.log(this.idOptica);

    this.opticaEmpleado();
  }
  title = 'menuProyecto';
  toggleDropdown(event: Event): void {
    const dropdown = (event.target as HTMLElement).nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      dropdown.classList.toggle('visible');
    }
  }

  opticaEmpleado(){
    this.empleadosService.opticaEmple(this.idOptica).subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.optica = data[0]; // Asigna el primer elemento del array a `optica`
          console.log("Óptica:", this.optica);
        } else {
          console.error("No se encontraron datos de la óptica.");
        }
      },
      error: (e) => {
        console.error("Error al obtener los datos de la óptica:", e);
      }
    })
  }

  cerrarSesion(){
    localStorage.clear();
  }

  buscarCliente(){
    localStorage.setItem('dni', this.dni);
    this.clientesService.buscarCli(this.dni).subscribe((data: any) => {
      //console.log(data);
      this.cliente = data;

      localStorage.setItem('idCli', this.cliente.id);
      localStorage.setItem('dniCli', this.cliente.dni);
      localStorage.setItem('nombreCli', this.cliente.nombre);
      localStorage.setItem('apellidoCli', this.cliente.apellido);
      localStorage.setItem('postalCli', this.cliente.codPostal);
      localStorage.setItem('telefonoCli', this.cliente.telefono);

      location.href='clientes/perfil-cliente/';
    })
  }

  buscarArticulo(){
    localStorage.setItem('id' , this.idArticulo);
    this.articulosRealService.getById(Number(this.idArticulo)).subscribe((data:any)=>{
      this.articulo=data;

      localStorage.setItem('idArt', this.articulo.id);
      localStorage.setItem('nombreArt', this.articulo.nombre);
      localStorage.setItem('descripcionArt', this.articulo.descripcion);
      localStorage.setItem('precioArt', this.articulo.precioCliente);
      localStorage.setItem('stockArt', this.articulo.stock);

      location.href='articulos/perfil-articulo/';
    })
    }

    conseguirProveedores(){
      this.proveedoresService.getAll().subscribe({
        next: (data: any) => {
          this.proveedores = data;
          console.log("proveedores:",this.proveedores)
        }
      })
    }

    crearArticulo(){
      const articulo={
        nombre:this.nombre,
        descripcion:this.descripcion,
        precioProveedor:this.precioProveedor,
        idProveedor:this.idProveedor
      }

      this.articulosRealService.createArticulo(articulo).subscribe({
        next: (data: any) => {
            console.log(data);
            this.router.navigate(['/articulos/ver-todos']);
        },
        error: (e) => {
          console.log(e);
        }
      });
      document.querySelector('.modal-backdrop')?.remove();
      document.getElementById('crearArtModal')?.classList.remove('show');
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
      console.log(articulo);
    }

    crearVenta(){
      const venta={
        fecha:this.fecha,
        metodoPago:this.metodoPago,
        dniCliente:this.dniCliente,
        idOptica:this.idOptica
      }
      this.ventasService.createVenta(venta).subscribe({
        next: (data: any) => {
            console.log(data);
            this.router.navigate(['/ventas/ver-todos']);
        },
        error: (e) => {
          console.log(e);
        }
      });
       //Borrar Modal
       document.querySelector('.modal-backdrop')?.remove();
       document.getElementById('crearVenModal')?.classList.remove('show');
       document.body.classList.remove('modal-open');
       document.querySelector('.modal-backdrop')?.remove();
      console.log(venta);
    }

    buscarVenta(){
      //console.log(this.dni);
      localStorage.setItem('dni', this.dni);
      this.clientesService.ventasCli(this.dni).subscribe({
        next: (data: any) => {
            console.log(data);
             //Borrar Modal
            document.querySelector('.modal-backdrop')?.remove();
            document.getElementById('crearVenModal')?.classList.remove('show');
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop')?.remove();
            this.router.navigate(['/clientes/ventas-cliente']);
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
}


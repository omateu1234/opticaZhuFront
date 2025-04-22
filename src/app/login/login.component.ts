import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CitasComponent } from '../citas/citas.component';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../Servicios/login.service';


@Component({
  selector: 'app-login',
  imports: [RouterOutlet, RouterLink, CitasComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  idOptica: any;

  nombreUsuario: string = '';
  contrasenia: string = '';
  user: any = [];

  constructor(private loginService: LoginService,
    private router: Router) { }


  onSubmit() {
    localStorage

    const login = {
      nombreUsuario: this.nombreUsuario,
      contrasenia: this.contrasenia
    }

    //console.log(login);
    this.loginService.login(login).subscribe({
      next: (data: any) => {
        this.user = data
        this.router.navigate(['/citas']);
        
        localStorage.setItem('rolUser', this.user.rol);
        localStorage.setItem('idOptica', this.user.optica.id);
        localStorage.setItem('idEmpleado', this.user.id);
        localStorage.setItem('nombreEmpleado', this.user.nombreUsuario);
        localStorage.setItem('nombre', this.user.nombre);
        localStorage.setItem('apellido', this.user.apellido);
        localStorage.setItem('direccion', this.user.direccion);
        localStorage.setItem('dni', this.user.dni);
        localStorage.setItem('telefono',this.user.telefono);
        localStorage.setItem('correo',this.user.correo);

        console.log(this.user);
      },
      error: (e) => {
        console.log(e);
      }
    });
    //console.log(login);

  }

  mostrarContrasenia() {

    let contrasenia = document.getElementById('contrasenia');
    let passicon = document.getElementById('passicon');

    if (contrasenia && passicon) {
      contrasenia.getAttribute('type') === 'password' ? contrasenia.setAttribute('type', 'text') : contrasenia.setAttribute('type', 'password');
      passicon.classList.toggle('fa-lock-open');
      passicon.classList.toggle('fa-lock');
    }
  }
}

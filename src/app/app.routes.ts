import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CitasComponent } from './citas/citas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { BuscarCliComponent } from './clientes/buscar/buscar.component';
import { CrearCliComponent } from './clientes/crear/crear.component';
import { VerTodosCliComponent } from './clientes/ver-todos/ver-todos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { BuscarComponent } from './empleados/buscar/buscar.component';
import { CrearComponent } from './empleados/crear/crear.component';
import { VerTodosEmpleadosComponent } from './empleados/ver-todos/ver-todos.component';
import { PerfilEmpleadoComponent } from "./empleados/perfil-empleado/perfil-empleado.component";
import { OpticasComponent } from './opticas/opticas.component';
import { OpticasTablaComponent } from './opticas/opticas-tabla/opticas-tabla.component';
import { OpticaConfigComponent } from './optica-config/optica-config.component';
import { InformacionComponent } from './optica-config/informacion/informacion.component';
import { CalendarioComponent } from './optica-config/calendario/calendario.component';
import { TrabajadoresComponent } from './optica-config/trabajadores/trabajadores.component';
import { ContentComponent } from './content/content.component';
import { FechaComponent } from './fecha/fecha.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ClientePerfilComponent } from './clientes/cliente-perfil/cliente-perfil.component';
import { auxiliarGuard } from './guards/auxiliar.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{path: 'login',
component: LoginComponent,
},
{
  path: 'citas',
  component: ContentComponent/* CitasComponent */,
  //canActivate: [auxiliarGuard],
  children: [{
    path: '',
    component: CitasComponent,
  }]
},
{
  path: 'clientes',
  component: ContentComponent, 
  children: [
    /* {
      path: 'buscar',
      component: BuscarCliComponent,
    },
    {
      path: 'crear',
      component: CrearCliComponent,
    }, */
    {
      path: 'ver-todos',
      component: VerTodosCliComponent,
    },
    {
      path: 'perfil-cliente',
      component: ClientePerfilComponent,
    }
  ]
},
{
  path: 'empleados',
  component: ContentComponent, 
  children: [
    /* {
      path: 'buscar',
      component: BuscarComponent,
    },
    {
      path: 'crear',
      component: CrearComponent,
    }, */
    {
      path: 'ver-todos',
      component: VerTodosEmpleadosComponent,
    },
    {
      path: 'perfil-empleado',
      component: PerfilEmpleadoComponent,
    }
  ]
},
{
  path: 'opticas',
  component: ContentComponent, 
  children: [
    {
      path: '',
      component: OpticasComponent,
      canActivate: [adminGuard],
    },
    {
      path: 'opticas-tabla',
      component: OpticasTablaComponent,
    }
  ]
},
{
  path: 'optica-config',
  component: ContentComponent, 
  children: [
    {
      path: '',
      redirectTo: 'informacion',
      pathMatch: 'full',
    },
    {
      path: 'informacion',
      component: InformacionComponent,
    },
    {
      path: 'calendario',
      component: CalendarioComponent,
    },
    {
      path: 'trabajadores',
      component: TrabajadoresComponent,
    }
  ]
},
{
  path: 'fecha',
  component: ContentComponent, 
  children: [
    {
      path: '',
      component: FechaComponent,
    }
  ]
},
{
  path: 'perfil',
  component: ContentComponent, 
  children: [
    {
      path: '',
      component: PerfilComponent,
    }
  ]
}/* ,
{
  path: 'login',
  component: ContentComponent, 
  children: [
    {
      path: '',
      component: LoginComponent,
    }
  ]
} */
];

/* {
  path: 'clientes',
  component: ClientesComponent,
  children: [
    {
      path: 'buscar',
      component: BuscarCliComponent,
      //canActivate: [auxiliarGuard]

    },
    {
      path: 'crear',
      component: CrearCliComponent
    },
    {
      path: 'ver-todos',
      component: VerTodosCliComponent,
      //canActivate: [auxiliarGuard]
    }
  ]
},
{
  path: 'empleados',
  component: EmpleadosComponent,
  children: [
    {
      path: 'buscar',
      component: BuscarComponent,

    },
    {
      path: 'crear',
      component: CrearComponent
    },
    {
      path: 'ver-todos',
      component: VerTodosEmpleadosComponent,

    }, {
      path: 'perfil-empleado',
      component: PerfilEmpleadoComponent,
    }
  ]
},

{
  path: 'opticas',
  component: OpticasComponent,
  children: [
    {
      path: 'opticas-tabla',
      component: OpticasTablaComponent
    }
  ]
},
{
  path: 'optica-config',
  component: OpticaConfigComponent,
  children: [
    {
      path: '',
      redirectTo: 'informacion',
      pathMatch: 'full'
    },
    {
      path: 'informacion',
      component: InformacionComponent
    },
    {
      path: 'calendario',
      component: CalendarioComponent
    },
    {
      path: 'trabajadores',
      component: TrabajadoresComponent
    }
  ]
},
{
  path: 'empleadoPerfil',
  component: EmpleadoPerfilComponent
},
{
  path: 'fecha',
  component: FechaComponent,
},
{
  path: 'perfil',
  component: PerfilComponent,
},
{
  path: 'login',
  component: LoginComponent,
}
];
 */
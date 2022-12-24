import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesComponent } from './paginas/estudiantes/estudiantes.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';


const routes: Routes = [
  {path: 'not-found' , component : NotfoundComponent},
  {path: '' , component : EstudiantesComponent},
  {path: '**' , redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculaRoutingModule } from './matricula-routing.module';
import { FormMatriculaComponent } from './form-matricula/form-matricula.component';
import { HomeMatriculaComponent } from './home-matricula/home-matricula.component';


@NgModule({
  declarations: [
    FormMatriculaComponent,
    HomeMatriculaComponent
  ],
  imports: [
    CommonModule,
    MatriculaRoutingModule
  ]
})
export class MatriculaModule { }

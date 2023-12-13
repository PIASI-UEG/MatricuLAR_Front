import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculaRoutingModule } from './matricula-routing.module';
import { FormMatriculaComponent } from './form-matricula/form-matricula.component';
import { HomeMatriculaComponent } from './home-matricula/home-matricula.component';
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    FormMatriculaComponent,
    HomeMatriculaComponent
  ],
  imports: [
    CommonModule,
    MatriculaRoutingModule, MatPaginatorModule
  ]

})
export class MatriculaModule { }

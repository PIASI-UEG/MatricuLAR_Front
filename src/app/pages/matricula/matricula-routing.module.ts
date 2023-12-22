import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeMatriculaComponent} from "./home-matricula/home-matricula.component";
import {ListMatriculaComponent} from "./list-matricula/list-matricula.component";
import {FormMatriculaComponent} from "./form-matricula/form-matricula.component";


export const matriculaRoutes: Routes = [
  {
    path: "matricula",
    component: HomeMatriculaComponent,
    children: [
      {
        path: "",
        component: ListMatriculaComponent,
        //canActivate: [SecurityGuard],
        //data: {security: {roles: ['ROLE_PRODUTO_INCLUIR', 'ROLE_PRODUTO_ALTERAR']}}
      },
      {
        path: "novo",
        component: FormMatriculaComponent
      },
      {
        path: ":id",
        component: FormMatriculaComponent
      }
    ]
  }
];


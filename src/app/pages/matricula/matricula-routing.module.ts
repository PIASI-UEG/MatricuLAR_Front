import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeMatriculaComponent} from "./home-matricula/home-matricula.component";
import {ListMatriculaComponent} from "./list-matricula/list-matricula.component";
import {FormMatriculaComponent} from "./form-matricula/form-matricula.component";
import {ImprimirTermoComponent} from "../imprimir-termo/imprimir-matricula/imprimir-termo.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";
import {ControlePeriodoMatriculaControllerService} from "../../api/services";
import {SecurityMatriculaGuard} from "../../arquitetura/security/security.matricula.guard";


export const matriculaRoutes: Routes = [
  {
    path: "matricula",
    component: HomeMatriculaComponent,
    children: [
      {
        path: "",
        component: ListMatriculaComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_A', 'ROLE_C', 'ROLE_D', 'ROLE_S']}}
      },
      {
        path: "validar",
        component: ListMatriculaComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_A', 'ROLE_C', 'ROLE_D']}}
      },
      {
        path: "novo",
        component: FormMatriculaComponent,
        canActivate: [SecurityMatriculaGuard]
      },
      {
        path: ":id",
        component: FormMatriculaComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_A', 'ROLE_C', 'ROLE_D', 'ROLE_S']}}
      },
      {
        path: "validar/:id",
        component: FormMatriculaComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_A', 'ROLE_C', 'ROLE_D']}}
      },
    ]
  }
];


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeMinhaContaComponent} from "./home-minha-conta/home-minha-conta.component";
import {FormMinhaContaComponent} from "./form-minha-conta/form-minha-conta.component";
import {HomeFuncionarioComponent} from "../funcionario/home-funcionario/home-funcionario.component";
import {ListFuncionarioComponent} from "../funcionario/list-funcionario/list-funcionario.component";
import {FormFuncionarioComponent} from "../funcionario/form-funcionario/form-funcionario.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";


export const minhaContaRoutes: Routes = [
  {
    path: "minha-conta",
    component: HomeMinhaContaComponent,
    children: [
      {
        path: ":id",
        component: FormMinhaContaComponent
      }
    ],
    canActivate: [SecurityGuard],
    data: {security: {roles: ['ROLE_A', 'ROLE_C', 'ROLE_D', 'ROLE_S']}}
  }
];

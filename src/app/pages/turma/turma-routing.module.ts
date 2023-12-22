import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeTurmaComponent} from "./home-turma/home-turma.component";
import {ListTurmaComponent} from "./list-turma/list-turma.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";
import {FormTurmaDialogComponent} from "./form-turma-dialog/form-turma-dialog.component";
import {F} from "@angular/cdk/keycodes";

export const turmaRoutes:  Routes = [
  {
    path: "turma",
    component: HomeTurmaComponent,
    children: [
      {
        path: "",
        component: ListTurmaComponent
        //canActivate: [SecurityGuard],
        //data: {security: {roles: ['ROLE_PRODUTO_INCLUIR', 'ROLE_PRODUTO_ALTERAR']}}

      }
    ]
  }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePainelComponent} from "./home-painel/home-painel.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";
import {InfoSistemaComponent} from "./info-sistema/info-sistema.component";


export const painelRoutes: Routes = [
  {
    path: "painel",
    component: HomePainelComponent,
    children: [
      {
        path: "",
        component: InfoSistemaComponent,
        //canActivate: [SecurityGuard],
        //data: {security: {roles: ['ROLE_PRODUTO_INCLUIR', 'ROLE_PRODUTO_ALTERAR']}}

      }
    ],
    canActivate: [SecurityGuard],
    data: {security: {roles: ['A', 'C','S']}}
  }
];


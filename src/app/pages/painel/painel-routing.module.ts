import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePainelComponent} from "./home-painel/home-painel.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";


export const painelRoutes: Routes = [
  {
    path: "painel",
    component: HomePainelComponent,
    canActivate: [SecurityGuard],
    data: {security: {roles: ['A', 'C','S']}}
  }
];


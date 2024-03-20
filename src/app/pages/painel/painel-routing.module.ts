import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePainelComponent} from "./home-painel/home-painel.component";


export const painelRoutes: Routes = [
  {
    path: "painel",
    component: HomePainelComponent
  }
];


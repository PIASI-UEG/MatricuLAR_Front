import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import {SecurityGuard} from "../../arquitetura/security/security.guard";
import {ListFuncionarioComponent} from "./list-funcionario/list-funcionario.component";
import {FormFuncionarioComponent} from "./form-funcionario/form-funcionario.component";
import {HomeFuncionarioComponent} from "./home-funcionario/home-funcionario.component";



export const funcionarioRoutes: Routes = [
  {
    path: "funcionario",
    component: HomeFuncionarioComponent,
    children: [
      {
        path: "",
        component: ListFuncionarioComponent,
      },
      {
        path: "novo",
        component: FormFuncionarioComponent
      },
      {
        path: ":id",
        component: FormFuncionarioComponent
      }
    ]
  }
];

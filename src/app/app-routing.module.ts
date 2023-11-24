import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";
import {SecurityGuard} from "./arquitetura/security/security.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
    ],
    canActivate: [SecurityGuard],
    data: {security: {roles: ['', '']}}
  },
  {
    path: "acesso",
    children: [
      ...AutenticacaoRoutes
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

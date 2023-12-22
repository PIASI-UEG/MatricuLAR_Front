import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";
import {SecurityGuard} from "./arquitetura/security/security.guard";
import {funcionarioRoutes} from "./pages/funcionario/funcionario-routing.module";
import {turmaRoutes} from "./pages/turma/turma-routing.module";
import {matriculaRoutes} from "./pages/matricula/matricula-routing.module";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      ...funcionarioRoutes,
      ...turmaRoutes,
      ...matriculaRoutes,
       { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
    //canActivate: [SecurityGuard],
    //data: {security: {roles: ['', '']}}
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

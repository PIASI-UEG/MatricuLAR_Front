import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";
import {SecurityGuard} from "./arquitetura/security/security.guard";
import {funcionarioRoutes} from "./pages/funcionario/funcionario-routing.module";
import {turmaRoutes} from "./pages/turma/turma-routing.module";
import {matriculaRoutes} from "./pages/matricula/matricula-routing.module";
import {minhaContaRoutes} from "./pages/minha-conta/minha-conta-routing.module";
import {homePageRoutes} from "./pages/home-page/home-page-routing.module";
import {painelRoutes} from "./pages/painel/painel-routing.module";
import {EsqueceuSenhaRoutingModule} from "./pages/esqueceu-senha/esqueceu-senha-routing.module";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      ...homePageRoutes,
      ...painelRoutes,
      ...funcionarioRoutes,
      ...turmaRoutes,
      ...matriculaRoutes,
      ...minhaContaRoutes,
       { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
    //canActivate: [SecurityGuard],
    //data: {security: {roles: ['', '']}}
  },
    {
        path: "",
        children: [
            ...EsqueceuSenhaRoutingModule,
        ]
    },
  {
    path: "acesso",
    children: [
      ...AutenticacaoRoutes,
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

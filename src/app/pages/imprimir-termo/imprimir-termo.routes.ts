import {Routes} from "@angular/router";
import {ImprimirTermoComponent} from "./imprimir-matricula/imprimir-termo.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";

export const imprimirTermoRoutes: Routes =[
    {
        path:"imprimir-termo",
        component: ImprimirTermoComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['ROLE_A', 'ROLE_C', 'ROLE_D', 'ROLE_S']}}
    }
]

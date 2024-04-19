import {Routes} from "@angular/router";
import {ImprimirTermoComponent} from "./imprimir-matricula/imprimir-termo.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";

export const imprimirTermoRoutes: Routes =[
    {
        path:"imprimir-termo",
        component: ImprimirTermoComponent,
        canActivate: [SecurityGuard],
        data: {security: {roles: ['A', 'C','S']}}
    }
]

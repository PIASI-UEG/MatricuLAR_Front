import {NgModule} from "@angular/core";
import {ImprimirTermoComponent} from "./imprimir-matricula/imprimir-termo.component";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations:[
        ImprimirTermoComponent
    ],
    imports: [
        MatButtonModule
    ]
})

export class ImprimirTermoModule{

}
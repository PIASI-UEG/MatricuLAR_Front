import {NgModule} from "@angular/core";
import {EsqueceuSenhaComponent} from "./esqueceu-senha/esqueceu-senha.component";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [
        EsqueceuSenhaComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        RouterOutlet,
        RouterLink,
        NgbModule,
    ]
})

export class EsqueceuSenhaModule{

}
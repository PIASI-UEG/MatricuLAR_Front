import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgxMaskDirective} from "ngx-mask";
import {FlexModule} from "@angular/flex-layout";
import { EsqueceuSenhaDialogComponent } from './esqueceu-senha-dialog/esqueceu-senha-dialog.component';


@NgModule({
    declarations: [
        EsqueceuSenhaDialogComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        RouterOutlet,
        RouterLink,
        NgbModule,
        FormsModule,
        MatInputModule,
        NgxMaskDirective,
        ReactiveFormsModule,
        FlexModule,
    ]
})

export class EsqueceuSenhaModule{

}
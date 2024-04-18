import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificaCPFDialogComponent } from './verifica-cpf-dialog/verifica-c-p-f-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective} from "ngx-mask";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import { AssinaturaDigitalDialogComponent } from './assinatura-digital-dialog/assinatura-digital-dialog.component';



@NgModule({
  declarations: [
    VerificaCPFDialogComponent,
    AssinaturaDigitalDialogComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    FlexModule,
    MatButtonModule,
  ]
})
export class AssinaturaModule { }

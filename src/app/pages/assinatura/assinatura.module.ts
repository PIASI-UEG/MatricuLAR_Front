import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssinaturaDialogComponent } from './assinatura-dialog/assinatura-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective} from "ngx-mask";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    AssinaturaDialogComponent
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

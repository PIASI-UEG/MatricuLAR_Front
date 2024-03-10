import { RouterModule } from '@angular/router';
import { AutenticacaoComponent } from './autenticacao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutenticacaoRoutes} from './autenticacao.routing';
import {AutenticacaoGuard} from './autenticacao-guard.service';
import {AutenticacaoService} from './autenticacao.service';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    AutenticacaoComponent
  ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        RouterModule.forChild(AutenticacaoRoutes),
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        FlexModule
    ],
  providers: [
    AutenticacaoGuard,
    AutenticacaoService
  ]
})
export class AutenticacaoModule {
}

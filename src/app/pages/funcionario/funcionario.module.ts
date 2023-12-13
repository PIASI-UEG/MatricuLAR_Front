import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFuncionarioComponent } from './home-funcionario/home-funcionario.component';
import { FormFuncionarioComponent } from './form-funcionario/form-funcionario.component';
import { ListFuncionarioComponent } from './list-funcionario/list-funcionario.component';

import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from "@angular/material/menu";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SearchModule} from "../../arquitetura/search-module/search.module";
import {FlexModule} from "@angular/flex-layout";
import {NgxMaskDirective} from "ngx-mask";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    HomeFuncionarioComponent,
    FormFuncionarioComponent,
    ListFuncionarioComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    SearchModule,
    FlexModule,
    NgxMaskDirective,
      BrowserModule,
  ]
})
export class FuncionarioModule { }

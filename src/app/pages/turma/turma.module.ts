import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeTurmaComponent } from './home-turma/home-turma.component';
import { ListTurmaComponent } from './list-turma/list-turma.component';
import { FormTurmaDialogComponent } from './form-turma-dialog/form-turma-dialog.component';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgxMaskDirective} from "ngx-mask";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {SearchModule} from "../../arquitetura/search-module/search.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import { FormTurmaComponent } from './form-turma/form-turma.component';
import {MatSelectModule} from "@angular/material/select";
import { InfoTurmaDialogComponent } from './info-turma-dialog/info-turma-dialog.component';


@NgModule({
  declarations: [
    HomeTurmaComponent,
    ListTurmaComponent,
    FormTurmaComponent,
    FormTurmaDialogComponent,
    InfoTurmaDialogComponent,
  ],
  imports: [
    CommonModule,
    FlexModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    SearchModule,
    RouterOutlet,
    RouterLink,
    MatSelectModule
  ]
})
export class TurmaModule { }

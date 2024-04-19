import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormMatriculaComponent } from './form-matricula/form-matricula.component';
import { HomeMatriculaComponent } from './home-matricula/home-matricula.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { ListMatriculaComponent } from './list-matricula/list-matricula.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxMaskDirective} from "ngx-mask";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SearchModule} from "../../arquitetura/search-module/search.module";
import {BrowserModule} from "@angular/platform-browser";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatTabsModule} from "@angular/material/tabs";
import { InfoMatriculaDialogComponent } from './info-matricula-dialog/info-matricula-dialog.component';


@NgModule({
  declarations: [
    FormMatriculaComponent,
    HomeMatriculaComponent,
    ListMatriculaComponent,
    InfoMatriculaDialogComponent
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
        MatNativeDateModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTabsModule
    ]
})
export class MatriculaModule { }

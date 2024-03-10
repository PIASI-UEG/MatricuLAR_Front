import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMinhaContaComponent } from './home-minha-conta/home-minha-conta.component';
import { FormMinhaContaComponent } from './form-minha-conta/form-minha-conta.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FlexModule} from "@angular/flex-layout";
import {NgxMaskDirective} from "ngx-mask";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";




@NgModule({
  declarations: [
    HomeMinhaContaComponent,
    FormMinhaContaComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterOutlet,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        FlexModule,
        NgxMaskDirective,
        MatButtonModule,
        MatCheckboxModule
    ]
})
export class MinhaContaModule { }

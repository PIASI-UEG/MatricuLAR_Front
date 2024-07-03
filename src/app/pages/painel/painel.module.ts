import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";
import {HomePainelComponent} from "./home-painel/home-painel.component";
import {MatGridListModule} from "@angular/material/grid-list";
import { InfoSistemaComponent } from './info-sistema/info-sistema.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    HomePainelComponent,
    InfoSistemaComponent,
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        RouterOutlet,
        RouterLink,
        MatGridListModule,
        MatSlideToggleModule
    ]
})
export class PainelModule { }
